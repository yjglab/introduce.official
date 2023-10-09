import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { JwtAuthGuard } from '@modules/auth/auth.jwt.guard';

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
  async signup(
    @Body()
    userData: {
      name: string;
      email: string;
      password: string;
      passwordConfirm: string;
      position: string;
    },
  ): Promise<User> {
    return this.userService.create(userData);
  }
}
