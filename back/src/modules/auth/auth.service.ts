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
import { AuthHelpers } from '@shared/helpers/auth.helpers';
import { GLOBAL_CONFIG } from '@configs/global.config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  public async emailDuplication(
    emailDuplicationDTO: EmailDuplicationDTO,
  ): Promise<{ message: string; hashedCode: string }> {
    const userData = await this.userService.findOne({
      email: emailDuplicationDTO.email,
    });

    if (userData) {
      throw new ForbiddenException('이미 사용중인 이메일입니다');
    }
    const code = '123';
    const hashedCode = (await AuthHelpers.hash(code)) as string;

    console.log(hashedCode);
    return {
      message: `${emailDuplicationDTO.email}로 인증코드를 전송했습니다.`,
      hashedCode,
    };
  }

  public async emailConfirmation(
    emailConfirmationDTO: EmailConfirmationDTO,
  ): Promise<{ message: string }> {
    const codeMatched = await AuthHelpers.verify(
      emailConfirmationDTO.userInputCode,
      emailConfirmationDTO.confirmationCode,
    );
    if (!codeMatched) {
      throw new ForbiddenException(
        '인증코드가 일치하지 않습니다. 다시 시도해주세요.',
      );
    }
    return { message: '인증되었습니다.' };
  }

  public async signin(signinUserDTO: SigninUserDTO): Promise<AuthResponseDTO> {
    const userData = await this.userService.findOne({
      email: signinUserDTO.email,
    });
    if (!userData) {
      throw new UnauthorizedException();
    }

    const passwordMatched = await AuthHelpers.verify(
      signinUserDTO.password,
      userData.password,
    );
    if (!passwordMatched) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      position: userData.position,
      password: null,
      class: userData.class,
      role: userData.role,
      createdAt: userData.createdAt,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: GLOBAL_CONFIG.security.expiresIn,
    });

    return {
      user: payload,
      accessToken: accessToken,
    };
  }
  public async signup(user: SignupUserDTO): Promise<User> {
    return this.userService.create(user);
  }
}
