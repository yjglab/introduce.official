import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  NotContains,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

export class CreateAccountDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({
    message: '이메일은 빈칸을 포함할 수 없습니다',
  })
  @IsEmail(
    {},
    {
      message: '이메일 형식이 아닙니다',
    },
  )
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({
    message: '닉네임을 입력해주세요',
  })
  @Length(3, 50, {
    message: '닉네임은 3~30자(영문 기준) 사이여야 합니다',
  })
  @Matches(/^[\w](?!.*?\.{2})[\w. ]{1,30}[\w]$/, {
    message:
      '닉네임은 문자, 숫자, 단어 사이의 공백만 포함할 수 있으며 최대 30자까지 가능합니다',
  })
  nickname: string;

  @ApiProperty({
    required: true,
    example: 'demo123',
  })
  @IsNotEmpty({
    message: '비밀번호를 입력해주세요',
  })
  @NotContains(' ', {
    message: '비밀번호는 빈칸을 포함할 수 없습니다',
  })
  @Length(3, 30, {
    message: '비밀번호는 3~30자 사이여야 합니다.',
  })
  password: string;

  @IsString()
  position: string;
}

export class LoginDto {
  @IsNotEmpty({
    message: 'Email cannot be empty or whitespace',
  })
  @IsEmail(
    {},
    {
      message: 'Email should be email',
    },
  )
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({
    message: '비밀번호를 입력해주세요',
  })
  @NotContains(' ', {
    message: '비밀번호는 빈칸을 포함할 수 없습니다',
  })
  @Length(3, 30, {
    message: '비밀번호는 3~30자 사이여야 합니다.',
  })
  password: string;
}
