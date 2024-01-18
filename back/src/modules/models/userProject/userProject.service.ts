import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma, UserProject } from '@prisma/client';
import { RegisterUserProjectDTO } from './userProject.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class UserProjectService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
  ) {}
  private readonly logger: Logger = new Logger('UserProjectService');
  async findOne(where: Prisma.UserProjectWhereUniqueInput) {
    return this.prisma.userProject.findUnique({
      where,
    });
  }

  async createPost(data: RegisterUserProjectDTO): Promise<UserProject> {
    const user = await this.userService.getUserByField('email', data.userEmail);

    return this.prisma.userProject.create({
      data: {
        category: data.category,
        title: data.title,
        subTitle: data.subTitle,
        thumbnail: data.thumbnail,
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
        // sections: {
        //   create: data.sections,
        // },
      },
    });
  }

  async updatePost(params: {
    where: Prisma.UserProjectWhereUniqueInput;
    data: Prisma.UserProjectUpdateInput;
  }) {
    const { data, where } = params;
    return this.prisma.userProject.update({
      data,
      where,
    });
  }

  async deletePost(where: Prisma.UserProjectWhereUniqueInput) {
    return this.prisma.userProject.delete({
      where,
    });
  }
}
