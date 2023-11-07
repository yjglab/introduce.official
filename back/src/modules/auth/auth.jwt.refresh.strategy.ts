import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserService } from '@modules/user/user.service';
import { JwtAccessDTO } from './auth.dto';
import { User } from '@prisma/client';

const fromCookie = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['rt']; // refreshToken 쿠키에서 받아옴
  }
  return token;
};

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: fromCookie,
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_REFRESH_TOKEN_PRIVATE_KEY'),
    });
  }

  async validate(payload: JwtAccessDTO): Promise<User | null> {
    let user = null;
    try {
      console.log('JwtRefreshStrategy: 접근');
      user = this.userService.findUserByEmail(payload);
      console.log('JwtRefreshStrategy: 검증');
    } catch (err) {
      console.log('JwtRefreshStrategy: 오류 - 1');
      throw new UnauthorizedException();
    }

    if (!user) {
      console.log('JwtRefreshStrategy: 오류 - 2');
      throw new UnauthorizedException();
    }

    return user;
  }
}
