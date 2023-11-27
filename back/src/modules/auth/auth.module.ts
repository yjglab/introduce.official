import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '@modules/user/user.service';
import { PrismaService } from '@modules/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { customJwtService } from './jwt/jwt.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    PrismaService,
    JwtStrategy,
    customJwtService,
  ],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_TOKEN_PRIVATE_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION'),
        },
      }),
    }),
    // forwardRef(() => UserModule),
  ],
})
export class AuthModule {}
