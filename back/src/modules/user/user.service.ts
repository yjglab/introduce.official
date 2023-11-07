import { SignUpDTO } from '@modules/auth/auth.dto';
import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { AuthHelpers } from '@shared/helpers/auth.helpers';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

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

  async createUser(data: SignUpDTO): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: { where: { id: number }; data }): Promise<User> {
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

  async setRefreshToken(token: string, userId: number) {
    const refreshToken = await AuthHelpers.hash(token);
    const refreshTokenExpiration = await this.getRefreshTokenExpiration();
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken,
        refreshTokenExpiration,
      },
    });
  }

  async getRefreshTokenExpiration(): Promise<Date> {
    const currentDate = new Date();
    const expirationDate = new Date(
      currentDate.getTime() +
        parseInt(
          this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION'),
        ),
    );
    return expirationDate;
  }
}
