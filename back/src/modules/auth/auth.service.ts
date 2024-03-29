import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateAccountDto, LoginDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { AccountStatus, Providers } from '@common/enums';
import { SocialProvider } from '@common/exceptions';
import { Request } from 'express';
import { nanoid } from 'nanoid';
import { AuthHelpers } from '@shared/helpers/auth.helpers';
import { UserService } from '@modules/models/user/user.service';
import { uuid } from 'uuidv4';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger('AuthService');

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    @InjectQueue('mail-queue') private mailQueue: Queue,
  ) {}

  public async register(registrationData: CreateAccountDto) {
    try {
      this.logger.debug(registrationData);
      const user = await this.userService.create({
        // avatar: await this.generateGravatarUrl(registrationData.email),
        provider: Providers.Local,
        id: uuid(),
        ...registrationData,
      });
      await this.sendConfirmationToken(user);

      return true;
    } catch (err) {
      if (err.meta.target.includes('email')) {
        throw new BadRequestException({
          email: '이미 존재하는 이메일 계정입니다.',
        });
      }
      if (err.meta.target.includes('displayName')) {
        throw new BadRequestException({
          displayName: '이미 존재하는 표시 이름입니다.',
        });
      }
      throw new InternalServerErrorException('Register Error');
    }
  }

  public async login(credentials: LoginDto, req: Request) {
    try {
      const { email, password } = credentials;

      const user = await this.getAuthenticatedUser(email, password);
      const [accessToken, refreshToken] = await this.generateTokens(user);

      await this.setTokens(req, { accessToken, refreshToken });

      return {
        user,
        accessToken,
      };
    } catch (err) {
      this.logger.debug(err);
      throw new HttpException(err.response, err.status);
    }
  }

  public async logout(req: Request) {
    if (req.cookies && req.cookies['refresh_token']) {
      const refreshTokenCookie = req.cookies['refresh_token'];
      const verifiedRefresh = await this.jwtService.verifyAsync(
        refreshTokenCookie,
        {
          secret: this.configService.get('JWT_REFRESH_SECRET_KEY'),
        },
      );
      await this.redisService
        .getClient()
        .del(`refresh-token:${verifiedRefresh.id}:${verifiedRefresh.jti}`);
    }
    req.res.clearCookie('access_token');
    req.res.clearCookie('refresh_token');
  }

  private async generateTokens(user: User) {
    const jwtid = nanoid();

    const accessToken = await this.jwtService.signAsync(
      {
        displayName: user.displayName,
        id: user.id,
      },
      {
        issuer: 'TeamIntroduce',
        secret: this.configService.get('JWT_ACCESS_SECRET_KEY'),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION_TIME'),
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        displayName: user.displayName,
        id: user.id,
      },
      {
        jwtid,
        issuer: 'TeamIntroduce',
        secret: this.configService.get('JWT_REFRESH_SECRET_KEY'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION_TIME'),
      },
    );
    this.logger.log(`refresh-token:${user.id}:${jwtid}`);
    await this.redisService.getClient().set(
      `refresh-token:${user.id}:${jwtid}`,
      user.id,
      'EX',
      60 * 60 * 24 * 30, // 30d
    );

    return [accessToken, refreshToken];
  }

  private async setTokens(
    req: Request,
    {
      accessToken,
      refreshToken,
    }: { accessToken: string; refreshToken?: string },
  ) {
    req.res.cookie('access_token', accessToken, {
      maxAge: 1000 * 60 * 60 * 1,
      httpOnly: true,
      sameSite: 'lax',
    });

    if (refreshToken) {
      req.res.cookie('refresh_token', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: true,
      });
    }
  }

  private async generateGravatarUrl(email: string) {
    const hashedEmail = await AuthHelpers.hash(email);
    return `https://www.gravatar.com/avatar/${hashedEmail}`;
  }

  public async getAuthenticatedUser(email: string, password: string) {
    try {
      const user = await this.userService.getUserByField('email', email);
      if (!user) {
        this.logger.debug('존재하지 않는 이메일');
        throw new BadRequestException({
          email: '존재하지 않는 계정입니다.',
        });
      }
      if (user.provider !== Providers.Local) {
        throw new SocialProvider();
      }
      const isMatch = await AuthHelpers.hashVerified(password, user.password);
      if (!isMatch) {
        throw new BadRequestException({
          password: '비밀번호가 일치하지 않습니다.',
        });
      }

      return user;
    } catch (err) {
      throw err;
    }
  }

  private async sendConfirmationToken(user: User) {
    const token = nanoid();

    await this.redisService
      .getClient()
      .set(`confirm-account:${token}`, user.id, 'EX', 60 * 60 * 1); // 토큰 만료까지 1시간

    await this.mailQueue.add('confirm', { user, token });
  }

  public async confirmAccount(user: User, token: string) {
    const accountId = await this.redisService
      .getClient()
      .get(`confirm-account:${token}`);

    if (!accountId) {
      if (
        accountId === user.id &&
        user.accountStatus === AccountStatus.VERIFIED
      ) {
        return {
          success: true,
          message: '계정이 이미 인증되어있습니다',
        };
      }

      return {
        success: false,
        message: '계정 확인 코드가 만료되었습니다. 다시 시도해주세요',
      };
    }

    if (user.id === accountId) {
      await this.userService.update(user.id, {
        accountStatus: AccountStatus.VERIFIED,
      });

      await this.redisService.getClient().del(`confirm-account:${token}`);
    }
    return {
      success: true,
      message: '계정이 성공적으로 인증되었습니다',
    };
  }

  public async resendConfirmationToken(user: any) {
    this.sendConfirmationToken(user);

    return {
      success: true,
      message: '계정 확인 코드가 다시 전송되었습니다. 이메일을 확인해주세요',
    };
  }

  public async verifyAccessToken(token: string) {
    const verifiedJWT = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get('JWT_ACCESS_SECRET_KEY'),
    });

    if (!verifiedJWT) {
      return '일치합니다';
    } else {
      return '잘못되었습니다.';
    }
  }

  public async refreshTokens(req: Request) {
    const refreshTokenCookie = req.cookies['refresh_token'];

    if (!refreshTokenCookie) {
      throw new UnauthorizedException('Invalid cookie');
    }

    const verifiedJWT = await this.jwtService.verifyAsync(refreshTokenCookie, {
      secret: this.configService.get('JWT_REFRESH_SECRET_KEY'),
    });

    if (!verifiedJWT) {
      // 만료 or 잘못된 토큰
      throw new UnauthorizedException('Invalid refresh token');
    }

    const refreshTokenRedis = await this.redisService
      .getClient()
      .get(`refresh-token:${verifiedJWT.id}:${verifiedJWT.jti}`);

    if (!refreshTokenRedis) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        displayName: verifiedJWT.displayName,
        id: verifiedJWT.id,
      },
      {
        issuer: 'TeamIntroduce',
        secret: this.configService.get('JWT_ACCESS_SECRET_KEY'),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION_TIME'),
      },
    );

    await this.setTokens(req, { accessToken });
    const user = await this.userService.getUserByField('id', verifiedJWT.id);
    return user;
  }

  public async getUserFromAccessToken(token: string) {
    const verifiedJWT = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get('JWT_ACCESS_SECRET_KEY'),
    });

    if (!verifiedJWT) {
      return undefined;
    }

    return this.userService.getUserByField('id', verifiedJWT.id);
  }

  public async getProfile(req: Request) {
    const user = req.user;
    this.logger.debug(user);
    return {
      user,
    };
  }

  // todo: socialProviderLogin
  // todo: 비밀번호 재설정
  // todo: 비밀번호 변경
  // todo: 새 비밀번호 설정
  //
}
