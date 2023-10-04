import { Injectable } from '@nestjs/common';
import { Prisma, ProjectPost } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectPostService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProjectPostCreateInput): Promise<ProjectPost> {
    return this.prisma.projectPost.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.ProjectPostWhereUniqueInput;
    data: Prisma.ProjectPostUpdateInput;
  }): Promise<ProjectPost> {
    const { data, where } = params;
    return this.prisma.projectPost.update({
      data,
      where,
    });
  }

  async delete(
    where: Prisma.ProjectPostWhereUniqueInput,
  ): Promise<ProjectPost> {
    return this.prisma.projectPost.delete({
      where,
    });
  }
}
