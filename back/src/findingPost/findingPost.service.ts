import { Injectable } from '@nestjs/common';
import { Prisma, FindingPost } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindingPostService {
  constructor(private prisma: PrismaService) {}

  async post(
    FindingPostWhereUniqueInput: Prisma.FindingPostWhereUniqueInput,
  ): Promise<FindingPost | null> {
    return this.prisma.findingPost.findUnique({
      where: FindingPostWhereUniqueInput,
    });
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FindingPostWhereUniqueInput;
    where?: Prisma.FindingPostWhereInput;
    orderBy?: Prisma.FindingPostOrderByWithRelationInput;
  }): Promise<FindingPost[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.findingPost.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.FindingPostCreateInput): Promise<FindingPost> {
    return this.prisma.findingPost.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.FindingPostWhereUniqueInput;
    data: Prisma.FindingPostUpdateInput;
  }): Promise<FindingPost> {
    const { data, where } = params;
    return this.prisma.findingPost.update({
      data,
      where,
    });
  }

  async delete(
    where: Prisma.FindingPostWhereUniqueInput,
  ): Promise<FindingPost> {
    return this.prisma.findingPost.delete({
      where,
    });
  }
}
