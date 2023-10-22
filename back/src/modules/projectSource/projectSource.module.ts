import { Module } from '@nestjs/common';

import { PrismaService } from '@modules/prisma/prisma.service';
import { ProjectSourceService } from './projectSource.service';
import { ProjectSourceController } from './projectSource.controller';

@Module({
  imports: [],
  controllers: [ProjectSourceController],
  providers: [ProjectSourceService, PrismaService],
  exports: [ProjectSourceService],
})
export class ProjectSourceModule {}
