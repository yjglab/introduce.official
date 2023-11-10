import { UserService } from '@modules/user/user.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtTokenPayload } from './types';
import { User } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.refreshToken;
        },
      ]),
      secretOrKey: process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
      passReqToCallback: true, // validate 함수에 request 객체를 보낼 지 여부
    });
  }

  async validate(req: Request, payload: JwtTokenPayload) {
    const refreshToken = req.cookies['refreshToken']; // passReqToCallback: true로 인해 접근 가능
    const user: User = await this.userService.getRefreshTokenMatchedUser(
      refreshToken,
      payload.id,
    );
    return user;
  }
}
