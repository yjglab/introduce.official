import { Module } from '@nestjs/common';

import { PrismaService } from '@modules/prisma/prisma.service';
import { ProjectPostService } from './projectPost.service';
import { ProjectPostController } from './projectPost.controller';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ProjectPostController],
  providers: [ProjectPostService, PrismaService],
  exports: [ProjectPostService],
})
export class ProjectPostModule {}
