import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Payload } from './jwt.payload';
import { UserService } from '@modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY,
    });
  }

  async validate(payload: Payload) {
    const user = await this.userService.findUserById({ id: payload.sub });
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException(
        '[PassportStrategy 에러] 존재하지 않는 사용자입니다.',
      );
    }
  }
}
