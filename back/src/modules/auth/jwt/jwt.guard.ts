import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(error: any, user: any, info: any): TUser {
    if (error || !user) {
      // error: jwt expired || invalid token || No auth token || jwt malformed
      console.log(info);
      throw error || new UnauthorizedException(info);
    } else {
      return user;
    }
  }
}
