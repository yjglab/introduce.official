import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JwtAccessDTO {
  @IsEmail()
  email: string;
}
export class SigninResponseDTO {
  data?: User;
  accessToken?: string;
  message: string;
}

export class EmailDuplicationDTO {
  @IsString()
  @ApiProperty()
  email: string;
}

export class EmailConfirmationDTO {
  @IsString()
  @ApiProperty()
  userInputCode: string;

  @IsString()
  @ApiProperty()
  confirmationCode: string;
}

export class SignupUserDTO {
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  position: string;
}

export class SigninUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsEmail({}, { message: '존재하지 않거나 잘못된 형식의 이메일입니다.' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
