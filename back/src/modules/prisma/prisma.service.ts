import { UserListener } from '@modules/user/user.listener';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.$use(UserListener.onCreated);
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
