import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import {
  EmailConfirmationDTO,
  EmailDuplicationDTO,
  JwtAccessDTO,
  SigninResponseDTO,
  SigninUserDTO,
  SignupUserDTO,
} from './auth.dto';
import { UserService } from '@modules/user/user.service';
import { AuthHelpers } from '@shared/helpers/auth.helpers';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  public async emailDuplication(
    data: EmailDuplicationDTO,
  ): Promise<{ message: string; hashedCode: string }> {
    const userData = await this.userService.findUserByEmail({
      email: AuthHelpers.decrypt(data.email),
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
    const codeMatched = await AuthHelpers.hashVerify(
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

  public async signin(
    data: SigninUserDTO,
    res: Response,
  ): Promise<SigninResponseDTO> {
    try {
      const user = await this.userService.findUserByEmail({
        email: data.email,
      });
      const passwordVerified = await AuthHelpers.hashVerify(
        data.password,
        user.password,
      );
      if (!passwordVerified) {
        throw new UnauthorizedException('잘못된 비밀번호입니다.');
      }

      const userPayload = {
        ...user,
        email: AuthHelpers.decrypt(user.email),
      };
      const accessPayload: JwtAccessDTO = {
        email: userPayload.email,
      };
      const refreshPayload: JwtAccessDTO = {
        email: userPayload.email,
      };
      console.log('JWT ENV', {
        privatekey: this.config.get('JWT_ACCESS_TOKEN_PRIVATE_KEY'),
        refreshkey: this.config.get('JWT_REFRESH_TOKEN_PRIVATE_KEY'),
      });
      const [accessToken, refreshToken] = [
        await this.jwtService.signAsync(accessPayload),
        await this.jwtService.signAsync(refreshPayload, {
          secret: this.config.get('JWT_REFRESH_TOKEN_PRIVATE_KEY'),
          expiresIn: this.config.get('JWT_REFRESH_TOKEN_EXPIRATION') * 1000,
        }),
      ];
      console.log(accessToken, refreshToken);
      // const accessToken = this.jwtService.sign(userPayload, {
      //   expiresIn: GLOBAL_CONFIG.security.expiresIn,
      // });

      res.cookie('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 1달
      });
      return {
        user: userPayload,
        accessToken: accessToken,
        message: '로그인 성공',
      };
    } catch (err) {
      console.error('signin error', err);
      return { message: '로그인 실패' };
    }
  }
  public async signup(data: SignupUserDTO): Promise<User> {
    data.email = AuthHelpers.encrypt(data.email);
    data.password = await AuthHelpers.hash(data.password);

    return this.userService.createUser(data);
  }
}
