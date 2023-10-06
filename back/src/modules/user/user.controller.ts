import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.users({});
  }

  @Post('user')
  async signUp(@Body() userData: Prisma.UserCreateInput): Promise<User> {
    return this.userService.create(userData);
  }
}
