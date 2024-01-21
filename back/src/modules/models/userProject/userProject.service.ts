import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma, UserProject } from '@prisma/client';
import { RegisterUserProjectDTO } from './userProject.dto';
import { UserService } from '../user/user.service';
import { uuid } from 'uuidv4';

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

  async createProject(data: RegisterUserProjectDTO): Promise<UserProject> {
    const user = await this.userService.getUserByField('id', data.userId);

    return this.prisma.userProject.create({
      data: {
        projectId: uuid(),
        category: data.category,
        title: data.title,
        subTitle: data.subtitle,
        thumbnail: data.thumbnail,
        description: data.description,
        Source: {
          create: {
            link: data.Source.link,
            name: data.Source.name,
            owner: data.Source.owner,
          },
        },
        skills: {
          set: data.skills,
        },
        Sections: {
          create: data.Sections.map((section) => ({
            sectionId: uuid(),
            name: section.name,
            description: section.description,
            Images: {
              create: section.SectionImages?.map((image) => ({
                src: image.src,
                alt: image.alt,
              })),
            },
            Keywords: {
              create: section.Keywords?.map((keyword) => ({
                keywordId: uuid(),
                name: keyword.name,
                description: keyword.description,
                image: keyword.image
                  ? {
                      create: {
                        src: keyword.image.src,
                        alt: keyword.image.alt,
                      },
                    }
                  : undefined,
              })),
            },
          })),
        },
        User: {
          connect: {
            id: user.id,
            displayName: user.displayName,
          },
        },
      },
    });
  }

  async updateProject(params: {
    where: Prisma.UserProjectWhereUniqueInput;
    data: Prisma.UserProjectUpdateInput;
  }) {
    const { data, where } = params;
    return this.prisma.userProject.update({
      data,
      where,
    });
  }

  async deleteProject(where: Prisma.UserProjectWhereUniqueInput) {
    return this.prisma.userProject.delete({
      where,
    });
  }
}
