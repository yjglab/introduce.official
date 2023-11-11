import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import {
  EmailConfirmationDTO,
  EmailDuplicationDTO,
  JwtRefreshTokenDTO,
  SignInDTO,
  SignUpDTO,
} from './auth.dto';
import { UserService } from '@modules/user/user.service';
import { AuthHelpers } from '@shared/helpers/auth.helpers';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { JwtTokenPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async emailDuplication(
    data: EmailDuplicationDTO,
  ): Promise<{ message: string; hashedCode: string }> {
    const userData = await this.userService.findUserByEmail({
      email: AuthHelpers.encryptCbc(data.email),
    });
    if (userData) {
      throw new ForbiddenException('이미 사용중인 이메일입니다');
    }
    const code = '123';
    const hashedCode = await AuthHelpers.hash(code);

    return {
      message: `${data.email}로 인증코드를 전송했습니다.`,
      hashedCode,
    };
  }

  public async emailConfirmation(
    data: EmailConfirmationDTO,
  ): Promise<{ message: string }> {
    const codeMatched = await AuthHelpers.hashVerified(
      data.userInputCode,
      data.confirmationCode,
    );
    if (!codeMatched) {
      throw new UnauthorizedException(
        '인증코드가 일치하지 않습니다. 다시 시도해주세요.',
      );
    }
    return { message: '인증되었습니다.' };
  }

  public async generateAccessToken(user: User): Promise<string> {
    const payload: JwtTokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      position: user.position,
    };
    return this.jwtService.signAsync(payload);
  }
  public async generateRefreshToken(user: User): Promise<string> {
    const payload: JwtTokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      position: user.position,
    };
    return this.jwtService.signAsync(
      { id: payload.id },
      {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_PRIVATE_KEY'),
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_TOKEN_EXPIRATION',
        ),
      },
    );
  }

  public async refresh(
    refreshTokenDto: JwtRefreshTokenDTO,
  ): Promise<{ accessToken: string }> {
    const { refreshToken } = refreshTokenDto;

    // JWT Refresh Token 시크릿 키 검증
    const decodedRefreshToken = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
    }) as JwtTokenPayload;

    // 사용자 존재여부 확인
    const user = await this.userService.getRefreshTokenMatchedUser(
      refreshToken,
      decodedRefreshToken.id,
    );
    if (!user) {
      throw new UnauthorizedException(
        'Refresh Token과 일치하는 사용자가 없습니다',
      );
    }

    // 새 토큰 생성
    const accessToken = await this.generateAccessToken(user);
    return { accessToken };
  }

  public async signin(
    data: SignInDTO,
    res: Response,
  ): Promise<{
    data?: User;
    accessToken?: string;
    refreshToken?: string;
    message: string;
  }> {
    try {
      const user = await this.userService.findUserByEmail({
        email: AuthHelpers.encryptCbc(data.email),
      });
      if (!user) {
        throw new NotFoundException('존재하지 않는 사용자입니다.');
      }
      const passwordVerified = await AuthHelpers.hashVerified(
        data.password,
        user.password,
      );
      if (!passwordVerified) {
        throw new UnauthorizedException('잘못된 비밀번호입니다.');
      }
      const accessToken = await this.generateAccessToken(user);
      const refreshToken = await this.generateRefreshToken(user);

      await this.userService.setRefreshToken(refreshToken, user.id);
      res.setHeader('Authorization', 'Bearer ' + [accessToken, refreshToken]);
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
      });
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
      });

      const userPayload = {
        ...user,
        email: AuthHelpers.decryptCbc(user.email),
      };
      Logger.debug(userPayload);
      return {
        data: userPayload,
        accessToken,
        refreshToken,
        message: '로그인 성공',
      };
    } catch (err) {
      console.error('signin error', err);
      return { message: '로그인 실패' };
    }
  }
  public async signup(data: SignUpDTO): Promise<User> {
    return this.userService.createUser(data);
  }
}
