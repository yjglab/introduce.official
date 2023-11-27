import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JwtRefreshTokenDTO {
  @IsNotEmpty()
  refreshToken: string;
}

export class EmailDuplicationDTO {
  @IsString()
  email: string;
}

export class EmailConfirmationDTO {
  @IsEmail()
  email: string;

  @IsString()
  userInputCode: string;

  @IsString()
  confirmationCode: string;
}

export class SignUpDTO {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  position: string;
}

export class SignInDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  autoSignIn: boolean;
}

export class SignOutDTO {
  @ApiProperty({ description: '', required: true })
  @IsString()
  refreshToken!: string;
}

export class ValidateUserDTO {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class ReprintTokenDTO {
  @ApiProperty({ description: '', required: true })
  @IsString()
  refreshToken!: string;
}
