import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

import { CreateAccountDto, LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard, RolesGuard, VerifiedGuard } from '@common/guards';
import { Roles, CurrentUser, Verified as Status } from '@common/decorators';
import { Role, AccountStatus } from '@common/enums';
import { User } from '@prisma/client';
import { Request } from 'express';

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({
    description: '전달받은 사용자 정보가 올바르면 계정 생성',
  })
  @Post('local/register')
  async register(@Body() credentials: CreateAccountDto, @Req() req: Request) {
    Logger.debug('ddd');
    return this.authService.register(credentials, req);
  }

  @ApiOkResponse({
    description: '사용자 로그인',
  })
  @HttpCode(200)
  @Post('local/login')
  async login(@Body() credentials: LoginDto, @Req() req: Request) {
    return this.authService.login(credentials, req);
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    description: '사용자 로그아웃',
  })
  @Delete('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request) {
    return this.authService.logout(req);
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    description: '현재 로그인된 사용자의 정보 로드',
  })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @SkipThrottle({ default: false })
  getProfile(@Req() req: Request) {
    return this.authService.getProfile(req);
  }

  @ApiOkResponse({
    description: '사용자 계정 확인',
  })
  @Status(AccountStatus.PENDING)
  @UseGuards(JwtAuthGuard, VerifiedGuard)
  @Get('account/confirm')
  confirmAccount(@CurrentUser() user: User, @Query('token') token: string) {
    return this.authService.confirmAccount(user, token);
  }

  @ApiOkResponse({
    description: '사용자 계정 확인 토큰 재전송',
  })
  @Status(AccountStatus.PENDING)
  @UseGuards(JwtAuthGuard, VerifiedGuard)
  @Get('account/confirm-resend')
  resendConfirmToken(@CurrentUser() user: User) {
    return this.authService.resendConfirmationToken(user);
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    description: '어드민 제한 API',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin')
  getAdminData() {
    return '어드민만 접근 가능한 경로입니다';
  }

  // todo: google login
  // todo: facebook login
  // password reset
  // password change
  // password set new
}
