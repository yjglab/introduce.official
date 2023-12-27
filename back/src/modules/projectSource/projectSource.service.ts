import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ProjectSourceService {
  constructor(private prisma: PrismaService) {}
  private readonly logger: Logger = new Logger('ProjectSourcService');
}
