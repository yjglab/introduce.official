import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';

import {
  EmailConfirmationDTO,
  EmailDuplicationDTO,
  ReprintTokenDTO,
  SignInDTO,
  SignUpDTO,
  ValidateUserDTO,
} from './auth.dto';
import { UserService } from '@modules/user/user.service';
import { AuthHelpers } from '@shared/helpers/auth.helpers';
import { calcDate, fieldExclude } from '@shared/helpers/prisma.helpers';
import { ONEYEAR, Payload } from './jwt/jwt.payload';
import { customJwtService } from './jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: customJwtService,
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

  public async validateUser({ email, password }: ValidateUserDTO) {
    try {
      const user = await this.userService.findUserByEmail({
        email: AuthHelpers.encryptCbc(email),
      });
      if (!user) {
        throw new NotFoundException(
          '[validateUser 에러] 존재하지 않는 사용자입니다.',
        );
      }
      const passwordVerified = await AuthHelpers.hashVerified(
        password,
        user.password,
      );
      if (passwordVerified) {
        const userPayload = {
          ...user,
          email: AuthHelpers.decryptCbc(user.email),
        };
        fieldExclude(userPayload, [
          'password',
          // 'refreshToken',
          // 'refreshTokenExpiration',
        ]);
        return userPayload;
      } else {
        throw new BadRequestException('잘못된 비밀번호입니다.');
      }
    } catch (error) {
      throw error;
    }
  }

  async signin({ email, password, autoSignIn }: SignInDTO) {
    try {
      const user = await this.validateUser({ email, password });
      const payload: Payload = this.jwtService.createPayload(
        email,
        autoSignIn,
        user.id,
      );

      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.generateRefreshToken(payload);

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async reprintToken({ refreshToken: refreshToken }: ReprintTokenDTO) {
    let decoded: Payload;
    try {
      // decoding refresh token
      decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userService.findUserById({ id: decoded.sub });
    const autoLogin: boolean = decoded.period === ONEYEAR;

    if (!user) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    const payload: Payload = this.jwtService.createPayload(
      user.email,
      autoLogin,
      user.id,
    );
    const accessToken = this.jwtService.sign(payload);
    const newRefreshToken = this.jwtService.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  public async signup(data: SignUpDTO): Promise<User> {
    return this.userService.createUser(data);
  }

  public async signout(userId: any, data: any) {
    userId;
    data;
  }
}
