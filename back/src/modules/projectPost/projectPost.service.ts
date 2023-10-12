import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectPostService {
  constructor(private prisma: PrismaService) {}

  async findOne(where: Prisma.ProjectPostWhereUniqueInput) {
    return this.prisma.projectPost.findUnique({
      where,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectPostWhereUniqueInput;
    where?: Prisma.ProjectPostWhereInput;
    orderBy?: Prisma.ProjectPostOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.projectPost.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data) {
    return this.prisma.projectPost.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.ProjectPostWhereUniqueInput;
    data: Prisma.ProjectPostUpdateInput;
  }) {
    const { data, where } = params;
    return this.prisma.projectPost.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.ProjectPostWhereUniqueInput) {
    return this.prisma.projectPost.delete({
      where,
    });
  }
}
