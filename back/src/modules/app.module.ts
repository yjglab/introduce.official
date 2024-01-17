import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';

import { PrismaService } from '@modules/prisma/prisma.service';
import { UserProjectModule } from './models/userProject/userProject.module';
import { ProjectSourceModule } from './models/projectSource/projectSource.module';
import { UserModule } from './models/user/user.module';
import {
  WsEmitterClientOptions,
  WsEmitterModule,
} from './models/chat/ws-emitter.module';

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
    WsEmitterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<WsEmitterClientOptions> => {
        return {
          config: {
            host: configService.get('REDIS_HOST') || 'localhost',
            port: configService.get('REDIS_PORT') || 6379,
          },
        };
      },
    }),
    PrismaModule,
    AuthModule,
    UserProjectModule,
    ProjectSourceModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    PrismaService,
  ],
})
export class AppModule {}
