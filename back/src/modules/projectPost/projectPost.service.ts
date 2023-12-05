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

  async createPost(data: RegisterProjectPostDTO): Promise<ProjectPost> {
    const user = await this.userService.getUserByField('email', data.userEmail);

    return this.prisma.projectPost.create({
      data: {
        category: data.category,
        title: data.title,
        description: data.description,
        user: {
          connect: {
            id: user.id,
          },
        },
        source: {
          create: {
            link: data.source.link,
            name: data.source.name,
            owner: data.source.owner,
          },
        },
        sections: {
          create: data.sections,
        },
      },
    });
  }

  async updatePost(params: {
    where: Prisma.ProjectPostWhereUniqueInput;
    data: Prisma.ProjectPostUpdateInput;
  }) {
    const { data, where } = params;
    return this.prisma.projectPost.update({
      data,
      where,
    });
  }

  async deletePost(where: Prisma.ProjectPostWhereUniqueInput) {
    return this.prisma.projectPost.delete({
      where,
    });
  }
}
