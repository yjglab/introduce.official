import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  EmailConfirmationDTO,
  EmailDuplicationDTO,
  SignInDTO,
  SignUpDTO,
} from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.jwt.guard';
import { Response } from 'express';
import { UserService } from '@modules/user/user.service';
import { User } from '@prisma/client';
import { JwtRefreshGuard } from './auth.jwt.refresh.guard';
// import { JWT_EXPIRY_SECONDS } from '@shared/constants/global.constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
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
  @ApiBody({ type: SignInDTO })
  async signin(
    @Body() data: SignInDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signin(data, res);
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

  @Get('signout')
  @ApiOperation({ description: '로그아웃' })
  @UseGuards(JwtRefreshGuard)
  async signout(@Req() req, @Res() res: Response) {
    await this.userService.removeRefreshToken(req.user.id); // refresh-guard를 통해 받아온 req 객체
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.send({
      message: '정상적으로 로그아웃 되었습니다.',
    });
  }

  @Get('authenticate')
  @ApiOperation({
    description: 'Access Token이 유효한지 검사 후 사용자 정보 전송',
  })
  @UseGuards(JwtAuthGuard)
  async user(@Req() req, @Res() res: Response) {
    try {
      const userId = req.user.id;
      const verifiedUser: User = await this.userService.findUserById(userId);
      return res.send(verifiedUser);
    } catch (error) {
      console.error('<Get> authenticate 실패');
      return false;
    }
  }

  @Post('refresh')
  @ApiOperation({
    description:
      'Refresh Token과 매치하는 사용자가 있는지 확인 후 새 Access Token 발급',
  })
  @UseGuards(JwtRefreshGuard)
  async refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
    try {
      const newAccessToken = (
        await this.authService.refresh({ refreshToken: req.user.refreshToken })
      ).accessToken;
      res.setHeader('Authorization', 'Bearer ' + newAccessToken);
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
      }); // js/XSS 접근 및 공격 방지
      res.send({ newAccessToken });
    } catch (err) {
      throw new UnauthorizedException(
        'Refresh Token이 잘못되었거나 인증이 만료된 토큰입니다.',
      );
    }
  }

  // @Post('refresh')
  // @ApiOperation({
  //   description:
  //     'Refresh Token과 매치하는 사용자가 있는지 확인 후 새 Access Token 발급',
  // })
  // async refresh(
  //   @Body() refreshTokenDto: JwtRefreshTokenDTO,
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   try {
  //     const newAccessToken = (await this.authService.refresh(refreshTokenDto))
  //       .accessToken;
  //     res.setHeader('Authorization', 'Bearer ' + newAccessToken);
  //     res.cookie('accessToken', newAccessToken, {
  //       httpOnly: true,
  //     }); // js 접근방지
  //     res.send({ newAccessToken });
  //   } catch (err) {
  //     throw new UnauthorizedException(
  //       'Refresh Token이 잘못되었거나 인증이 만료된 토큰입니다.',
  //     );
  //   }
  // }
}
