import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, ProjectPost } from '@prisma/client';

@Injectable()
export class ProjectPostService {
  constructor(private prisma: PrismaService) {}

  async post(
    projectPostWhereUniqueInput: Prisma.ProjectPostWhereUniqueInput,
  ): Promise<ProjectPost | null> {
    return this.prisma.projectPost.findUnique({
      where: projectPostWhereUniqueInput,
    });
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectPostWhereUniqueInput;
    where?: Prisma.ProjectPostWhereInput;
    orderBy?: Prisma.ProjectPostOrderByWithRelationInput;
  }): Promise<ProjectPost[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.projectPost.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

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
