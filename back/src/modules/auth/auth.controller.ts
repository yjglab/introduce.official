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
    return res.status(200).send({ message, hashedCode });
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
  async signin(@Body() user: SigninUserDTO, @Response() res) {
    const signinData = await this.authService.signin(user);

    res.cookie('accessToken', signinData.accessToken, {
      expires: new Date(new Date().getTime() + JWT_EXPIRY_SECONDS * 1000),
      sameSite: 'strict',
      secure: true,
      httpOnly: true,
    });

    return res.status(200).send(signinData);
  }

  @Post('signup')
  async signup(@Body() user: SignupUserDTO): Promise<User> {
    return this.authService.signup(user);
  }

  @Post('signout')
  signout(@Response() res): void {
    res.clearCookie('accessToken');
    res.status(200).send({ success: true });
  }
}
