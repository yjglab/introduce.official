import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectSourceService {
  constructor(private prisma: PrismaService) {}
}
