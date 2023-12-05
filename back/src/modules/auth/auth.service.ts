import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateAccountDto, LoginDto } from './auth.dto';
import { UserService } from '@modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { AccountStatus, PostgresErrorCode, Providers } from '@common/enums';
import {
  InvalidCredentials,
  SocialProvider,
  UniqueViolation,
} from '@common/exceptions';
import { Request } from 'express';
import { nanoid } from 'nanoid';
import { AuthHelpers } from '@shared/helpers/auth.helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    @InjectQueue('mail-queue') private mailQueue: Queue,
  ) {}

  public async register(registrationData: CreateAccountDto, req: Request) {
    try {
      const user = await this.userService.create({
        avatar: this.generateGravatarUrl(registrationData.email),
        provider: Providers.Local,
        ...registrationData,
      });

      await this.sendConfirmationToken(user);

      const [accessToken, refreshToken] = await this.generateTokens(user);

      await this.setTokens(req, { accessToken, refreshToken });

      return {
        user,
        accessToken,
      };
    } catch (err) {
      if (err.code == PostgresErrorCode.UniqueViolation) {
        if (err.detail.includes('email')) {
          throw new UniqueViolation('email');
        }

        if (err.detail.includes('nickname')) {
          throw new UniqueViolation('nickname');
        }
      }
      throw new InternalServerErrorException();
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
        nickname: user.nickname,
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
        nickname: user.nickname,
        id: user.id,
      },
      {
        jwtid,
        issuer: 'TeamIntroduce',
        secret: this.configService.get('JWT_REFRESH_SECRET_KEY'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION_TIME'),
      },
    );

    await this.redisService
      .getClient()
      .set(
        `refresh-token:${user.id}:${jwtid}`,
        user.id,
        'EX',
        60 * 60 * 24 * 30,
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

  private generateGravatarUrl(email: string) {
    const hashedEmail = AuthHelpers.hash(email);
    return `https://www.gravatar.com/avatar/${hashedEmail}`;
  }

  public async getAuthenticatedUser(email: string, password: string) {
    try {
      const user = await this.userService.getUserByField('email', email);
      if (!user) {
        throw new InvalidCredentials();
      }

      if (user.provider !== Providers.Local) {
        throw new SocialProvider();
      }

      const isMatch = await AuthHelpers.hashVerified(user.password, password);
      if (!isMatch) {
        throw new InvalidCredentials();
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
        parseInt(accountId) === user.id &&
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

    if (user.id === parseInt(accountId)) {
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

  public async refreshTokens(req: Request) {
    const refreshTokenCookie = req.cookies['refresh_token'];

    if (!refreshTokenCookie) {
      throw new UnauthorizedException('Invalid cookie');
    }

    const verifiedJWt = await this.jwtService.verifyAsync(refreshTokenCookie, {
      secret: this.configService.get('JWT_REFRESH_SECRET_KEY'),
    });

    if (!verifiedJWt) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const refreshTokenRedis = await this.redisService
      .getClient()
      .get(`refresh-token:${verifiedJWt.id}:${verifiedJWt.jti}`);

    if (!refreshTokenRedis) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        displayName: verifiedJWt.displayName,
        id: verifiedJWt.id,
      },
      {
        issuer: 'TeamIntroduce',
        secret: this.configService.get('JWT_ACCESS_SECRET_KEY'),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION_TIME'),
      },
    );

    await this.setTokens(req, { accessToken });
    const user = await this.userService.getUserByField('id', verifiedJWt.id);
    return user;
  }

  public async getUserFromAccessToken(token: string) {
    const verifiedJWt = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get('JWT_ACCESS_SECRET_KEY'),
    });

    if (!verifiedJWt) {
      return undefined;
    }

    return this.userService.getUserByField('id', verifiedJWt.id);
  }

  public async getProfile(req: Request) {
    return {
      user: req.user,
    };
  }

  // todo: socialProviderLogin
  // todo: 비밀번호 재설정
  // todo: 비밀번호 변경
  // todo: 새 비밀번호 설정
  //
}
