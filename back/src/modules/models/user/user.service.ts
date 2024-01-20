import { AccountStatus, PostgresErrorCode } from '@common/enums';
import { UniqueViolation } from '@common/exceptions';
import { PrismaService } from '@modules/prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { uuid } from 'uuidv4';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private readonly logger: Logger = new Logger('UserService');
  public async create(data: Prisma.UserCreateInput) {
    const user = await this.prisma.user.create({ data });
    return user;
  }

  public async update(userId: string, values: Prisma.UserUpdateInput) {
    this.prisma.user.update({
      where: {
        id: userId,
      },
      data: values,
    });
  }

  public async updateProfile(userId: string, values: Prisma.UserUpdateInput) {
    try {
      this.prisma.user.update({
        where: {
          id: userId,
        },
        data: values,
      });

      return {
        success: true,
        message: '프로필 정보가 업데이트 되었습니다.',
      };
    } catch (err) {
      if (err.code == PostgresErrorCode.UniqueViolation) {
        if (err.detail.includes('email')) {
          throw new UniqueViolation('email');
        }

        if (err.detail.includes('displayName')) {
          throw new UniqueViolation('displayName');
        }
      }
      throw new InternalServerErrorException();
    }
  }

  public async getUserByField(field: string, value: string | number) {
    const user = await this.prisma.user.findFirst({
      where: {
        [field]: value,
      },
      include: {
        Projects: true,
      },
    });
    return user;
  }

  public async continueWithProvider(req: any) {
    const { providerId, email } = req.user;

    let user = await this.prisma.user.findFirst({
      where: {
        OR: [{ providerId }, { email }],
      },
    });

    if (user) {
      if (req.user.email === user.email && user.provider === 'local') {
        throw new BadRequestException(
          '소셜 계정과 동일한 이메일을 가진 사용자가 이미 존재합니다.',
        );
      }
    }
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          provider: req.user.provider,
          providerId: req.user.providerId,
          id: uuid(),
          email: req.user.email,
          position: req.user.position,
          password: req.user.password,
          displayName: req.user.displayName,
          avatar: req.user.avatar,
          accountStatus: AccountStatus.VERIFIED,
        },
      });
    }

    return user;
  }
}
