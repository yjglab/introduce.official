import { Module } from '@nestjs/common';

import { PrismaService } from '@modules/prisma/prisma.service';
import { UserProjectController } from './userProject.controller';
import { UserModule } from '../user/user.module';
import { UserProjectService } from './userProject.service';

@Module({
  imports: [UserModule],
  controllers: [UserProjectController],
  providers: [UserProjectService, PrismaService],
  exports: [UserProjectService],
})
export class UserProjectModule {}
