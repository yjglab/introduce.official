import { SignUpDTO } from '@modules/auth/auth.dto';
import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { AuthHelpers } from '@shared/helpers/auth.helpers';
import { calcDate } from '@shared/helpers/prisma.helpers';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

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
    const refreshTokenExpiration = await this.generateRefreshTokenExpiration();

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken,
        refreshTokenExpiration: calcDate(refreshTokenExpiration, 'set'),
      },
    });
  }

  async removeRefreshToken(userId: number) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: null,
        refreshTokenExpiration: null,
      },
    });
  }

  async generateRefreshTokenExpiration(): Promise<Date> {
    const currentDate = new Date();
    const expirationDate = new Date(
      currentDate.getTime() +
        parseInt(
          this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION'),
        ),
    );

    return expirationDate;
  }

  async getRefreshTokenMatchedUser(
    refreshToken: string,
    userId: number,
  ): Promise<User> {
    const user: User = await this.findUserById({ id: userId });

    // User 테이블의 암호화된 refreshToken이 null일 경우
    if (!user.refreshToken) {
      return null;
    }

    const refreshTokenMatched = await AuthHelpers.hashVerified(
      refreshToken,
      user.refreshToken,
    );

    if (refreshTokenMatched) {
      return user;
    }
  }
}
