import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, ProjectPost } from '@prisma/client';
import { RegisterProjectPostDTO } from './projectPost.dto';
import { UserService } from '@modules/user/user.service';

@Injectable()
export class ProjectPostService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  async findOne(where: Prisma.ProjectPostWhereUniqueInput) {
    return this.prisma.projectPost.findUnique({
      where,
    });
  }

  async create(data: RegisterProjectPostDTO): Promise<ProjectPost> {
    const userData = await this.userService.findOne({
      email: data.userEmail,
    });
    return this.prisma.projectPost.create({
      data: {
        category: data.category,
        title: data.title,
        description: data.description,
        user: {
          connect: {
            id: userData.id,
          },
        },
        // todo: source controller
      },
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
