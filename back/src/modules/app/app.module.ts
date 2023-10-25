import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ProjectPostModule } from '@modules/projectPost/projectPost.module';
import { UserModule } from '@modules/user/user.module';
import { ProjectSourceModule } from '@modules/projectSource/projectSource.module';
import { ConfigModule } from '@nestjs/config';
import { PRODUCTION } from '@shared/constants/global.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: PRODUCTION,
    }),
    PrismaModule,
    AuthModule,
    ProjectPostModule,
    ProjectSourceModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
