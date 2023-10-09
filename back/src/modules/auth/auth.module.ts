import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { JWT_SECRET } from 'src/shared/constants/global.constants';
import { JwtStrategy } from './auth.jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

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
