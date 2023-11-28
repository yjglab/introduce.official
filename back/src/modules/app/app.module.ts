import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ProjectPostModule } from '@modules/projectPost/projectPost.module';
import { UserModule } from '@modules/user/user.module';
import { ProjectSourceModule } from '@modules/projectSource/projectSource.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<RedisModuleOptions> => {
        return {
          config: {
            host: configService.get('REDIS_HOST') || 'localhost',
            port: configService.get('REDIS_PORT') || 6379,
          },
        };
      },
    }),
    // todo: 웹소켓 WsEmitterModule 추가
    PrismaModule,
    AuthModule,
    ProjectPostModule,
    ProjectSourceModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
