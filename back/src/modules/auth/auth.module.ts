import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/shared/constants/global.constants';
import { JwtStrategy } from './auth.jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { UserService } from '@modules/user/user.service';
import { PrismaService } from '@modules/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
    }),
    PrismaModule,
  ],
  providers: [UserService, AuthService, JwtStrategy, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
