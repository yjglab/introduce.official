import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { AuthResponseDTO, SigninUserDTO, SignupUserDTO } from './auth.dto';
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
