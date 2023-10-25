import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@modules/user/user.service';
import { User } from '@prisma/client';
import { JwtAccessDTO } from './auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // accessToken 헤더에서 받아옴
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_ACCESS_TOKEN_PRIVATE_KEY'),
    });
  }
  async validate(payload: JwtAccessDTO): Promise<User | null> {
    let user = null;
    try {
      user = this.usersService.findUserByEmail(payload);
      console.log('JwtStrategy: 결과', user);
    } catch (e) {
      console.log('JwtStrategy: 오류 - 1');
      throw new UnauthorizedException();
    }

    if (!user) {
      console.log('JwtStrategy: 오류 - 2');
      throw new UnauthorizedException();
    }

    return user;
  }
}
