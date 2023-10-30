import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  EmailConfirmationDTO,
  EmailDuplicationDTO,
  SigninResponseDTO,
  SigninUserDTO,
  SignupUserDTO,
} from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.jwt.guard';
import { Response } from 'express';
// import { JWT_EXPIRY_SECONDS } from '@shared/constants/global.constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  @ApiBody({ type: SigninUserDTO })
  @ApiResponse({ type: SigninResponseDTO })
  async signin(@Body() data: SigninUserDTO, @Res() res: Response) {
    return this.authService.signin(data, res);
  }

  @Post('signup')
  @ApiOperation({ description: '회원가입' })
  @ApiBody({ type: SignupUserDTO })
  async signup(@Body() data: SignupUserDTO) {
    await this.authService.signup(data);
    return {
      message: '회원가입이 완료되었습니다! 가입된 정보로 로그인 해주세요.',
    };
  }

  @Get('signout')
  @UseGuards(JwtAuthGuard)
  async signout(@Res() res: Response) {
    res.clearCookie('accessToken');
    res.status(200).send('로그아웃 되었습니다.');
  }
}
