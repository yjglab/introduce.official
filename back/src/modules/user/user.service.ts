import { SignUpDTO } from '@modules/auth/auth.dto';
import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { AuthHelpers } from '@shared/helpers/auth.helpers';
import { calcDate } from '@shared/helpers/prisma.helpers';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUserById(where: { id: number }) {
    const user = await this.prisma.user.findUnique({
      where,
    });
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }
    return this.findUserByEmail({ email: user.email });
  }

  async findUserByEmail(where: { email: string }) {
    return this.prisma.user.findUnique({
      where,
      include: {
        projectPosts: true,
      },
    });
  }
}
