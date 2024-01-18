import { IsArray, IsEmail, IsObject, IsString } from 'class-validator';

export class RegisterUserProjectDTO {
  @IsEmail()
  userEmail: string;

  @IsString()
  category: string;

  @IsString()
  title: string;

  @IsString()
  subTitle: string;

  @IsString()
  thumbnail: string;

  @IsString()
  description: string;

  @IsObject()
  source: {
    name: string;
    link: string;
    owner: string;
  };

  @IsArray()
  skills: string[];

  @IsArray()
  sections: {
    header: string;
    description: string;
    images: string[];
  }[];
}
