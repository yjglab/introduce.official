import { Module } from '@nestjs/common';

import { PrismaService } from '@modules/prisma/prisma.service';
import { ProjectPostService } from './projectPost.service';
import { ProjectPostController } from './projectPost.controller';

@Module({
  imports: [],
  controllers: [ProjectPostController],
  providers: [ProjectPostService, PrismaService],
  exports: [ProjectPostService],
})
export class ProjectPostModule {}
