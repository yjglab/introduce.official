import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  EmailConfirmationDTO,
  EmailDuplicationDTO,
  ReprintTokenDTO,
  SignInDTO,
  SignOutDTO,
  SignUpDTO,
} from './auth.dto';
import { AuthService } from './auth.service';
import { UserService } from '@modules/user/user.service';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { AuthUser } from './auth.user.decorator';
import { User } from '@prisma/client';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('email-duplication')
  @ApiOperation({ description: '이메일 중복 확인' })
  @ApiBody({ type: EmailDuplicationDTO })
  async emailDuplication(@Body() data: EmailDuplicationDTO) {
    return this.authService.emailDuplication(data);
  }

  @Post('email-confirmation')
  @ApiOperation({ description: '이메일 인증 코드 확인' })
  @ApiBody({ type: EmailConfirmationDTO })
  async emailConfirmation(@Body() data: EmailConfirmationDTO) {
    return this.authService.emailConfirmation(data);
  }

  @Post('signin')
  @ApiOperation({ description: '로그인' })
  async signin(@Body() data: SignInDTO) {
    return this.authService.signin(data);
  }

  @Post('reprint-token')
  async reprintToken(@Body() data: ReprintTokenDTO) {
    return this.authService.reprintToken(data);
  }

  @Post('signup')
  @ApiOperation({ description: '회원가입' })
  @ApiBody({ type: SignUpDTO })
  async signup(@Body() data: SignUpDTO) {
    await this.authService.signup(data);
    return {
      message: '회원가입이 완료되었습니다! 가입된 정보로 로그인 해주세요.',
    };
  }

  @ApiOperation({ description: '로그아웃' })
  @UseGuards(JwtAuthGuard)
  @Post('signout')
  async signout(@AuthUser() user: User, @Body() data: SignOutDTO) {
    return this.authService.signout(user.id, data);
  }
}
