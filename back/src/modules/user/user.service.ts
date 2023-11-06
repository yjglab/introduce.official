import { SignupUserDTO } from '@modules/auth/auth.dto';
import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(where: { email: string }) {
    return this.prisma.user.findUnique({
      where,
      include: {
        social: {
          select: {
            name: true,
          },
        },
        projectPosts: {
          select: {
            title: true,
            category: true,
            description: true,
            source: {
              select: {
                name: true,
                link: true,
                owner: true,
              },
            },
            grades: true,
            user: {
              select: {
                name: true,
              },
            },
            skills: true,
            likers: {
              select: {
                name: true,
              },
            },
            markers: {
              select: {
                name: true,
              },
            },
            sections: {
              select: {
                header: true,
                description: true,
                images: true,
              },
            },
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async createUser(data: SignupUserDTO): Promise<User> {
    Logger.debug(data.password);
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: { where: { email: string }; data }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: { email: string }): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
