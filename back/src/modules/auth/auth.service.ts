import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import {
  AuthResponseDTO,
  EmailConfirmationDTO,
  EmailDuplicationDTO,
  SigninUserDTO,
  SignupUserDTO,
} from './auth.dto';
import { UserService } from '@modules/user/user.service';
import { PrismaService } from '@modules/prisma/prisma.service';
import { GLOBAL_CONFIG } from '@configs/global.config';
import { AuthHelpers } from '@shared/helpers/auth.helpers';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  public async emailDuplication(
    data: EmailDuplicationDTO,
  ): Promise<{ message: string; hashedCode: string }> {
    const userData = await this.userService.findOne({
      email: data.email,
    });

    if (userData) {
      throw new ForbiddenException('이미 사용중인 이메일입니다');
    }
    const code = '123';
    const hashedCode = await AuthHelpers.hash(code);

    console.log('email duplication hashed code', hashedCode);
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
      throw new ForbiddenException(
        '인증코드가 일치하지 않습니다. 다시 시도해주세요.',
      );
    }
    return { message: '인증되었습니다.' };
  }

  public async signin(data: SigninUserDTO): Promise<AuthResponseDTO> {
    const userData = await this.userService.findOne({
      email: data.email,
    });
    const passwordVerified = await AuthHelpers.hashVerify(
      data.password,
      userData.password,
    );
    if (!passwordVerified) {
      throw new UnauthorizedException('잘못된 비밀번호입니다.');
    }

    const userPayload = {
      id: userData.id,
      email: AuthHelpers.decrypt(userData.email),
      name: userData.name,
      password: null,
      position: userData.position,
      class: userData.class,
      role: userData.role,
      projectPosts: userData.projectPosts,

      createdAt: userData.createdAt,
    };

    const accessToken = this.jwtService.sign(userPayload, {
      expiresIn: GLOBAL_CONFIG.security.expiresIn,
    });

    return {
      user: userPayload,
      accessToken: accessToken,
    };
  }
  public async signup(data: SignupUserDTO): Promise<User> {
    data.email = await AuthHelpers.encrypt(data.email);
    data.password = await AuthHelpers.hash(data.password);

    return this.userService.create(data);
  }
}
