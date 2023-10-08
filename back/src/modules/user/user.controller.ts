import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';

@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(): Promise<User[]> {
    return this.userService.users({});
  }

  @Post('user')
  async signup(@Body() userData: Prisma.UserCreateInput): Promise<User> {
    return this.userService.create(userData);
  }
}
