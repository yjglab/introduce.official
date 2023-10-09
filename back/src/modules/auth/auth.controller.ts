import { Body, Controller, Post, Response } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { JWT_EXPIRY_SECONDS } from '../../shared/constants/global.constants';
import { AuthResponseDTO, SigninUserDTO, SignupUserDTO } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ description: '회원가입' })
  @ApiBody({ type: SigninUserDTO })
  @ApiResponse({ type: AuthResponseDTO })
  async signin(
    @Body() user: SigninUserDTO,
    @Response() res,
  ): Promise<AuthResponseDTO> {
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
