import { Body, Controller, Post, Response } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import {
  AuthResponseDTO,
  EmailConfirmationDTO,
  EmailDuplicationDTO,
  SigninUserDTO,
  SignupUserDTO,
} from './auth.dto';
import { AuthService } from './auth.service';
import { JWT_EXPIRY_SECONDS } from '@shared/constants/global.constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('email-duplication')
  @ApiOperation({ description: '이메일 중복 확인' })
  @ApiBody({ type: EmailDuplicationDTO })
  async emailDuplication(@Body() data: EmailDuplicationDTO, @Response() res) {
    const { message, hashedCode } =
      await this.authService.emailDuplication(data);
    return res.status(200).json({ message, hashedCode });
  }

  @Post('email-confirmation')
  @ApiOperation({ description: '이메일 인증 코드 확인' })
  @ApiBody({ type: EmailConfirmationDTO })
  async emailConfirmation(@Body() data: EmailConfirmationDTO, @Response() res) {
    const { message } = await this.authService.emailConfirmation(data);
    return res.status(200).send(message);
  }

  @Post('signin')
  @ApiOperation({ description: '로그인' })
  @ApiBody({ type: SigninUserDTO })
  @ApiResponse({ type: AuthResponseDTO })
  async signin(@Body() data: SigninUserDTO, @Response() res) {
    const signinData = await this.authService.signin(data);

    res.cookie('accessToken', signinData.accessToken, {
      expires: new Date(new Date().getTime() + JWT_EXPIRY_SECONDS * 1000),
      sameSite: 'strict',
      secure: true,
      httpOnly: true,
    });
    console.log(
      'expire time: ',
      new Date(new Date().getTime() + JWT_EXPIRY_SECONDS * 1000),
    );
    return res.status(200).json(signinData);
  }

  @Post('signup')
  @ApiOperation({ description: '회원가입' })
  @ApiBody({ type: SignupUserDTO })
  async signup(@Body() data: SignupUserDTO, @Response() res): Promise<User> {
    await this.authService.signup(data);
    return res
      .status(200)
      .send('회원가입이 완료되었습니다! 가입된 정보로 로그인 해주세요.');
  }

  @Post('signout')
  signout(@Response() res): void {
    res.clearCookie('accessToken');
    res.status(200).send('로그아웃 되었습니다.');
  }
}
