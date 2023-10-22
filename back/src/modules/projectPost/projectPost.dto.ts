import { IsArray, IsEmail, IsObject, IsString } from 'class-validator';

export class RegisterProjectPostDTO {
  @IsEmail()
  userEmail: string;

  @IsString()
  category: string;

  @IsString()
  title: string;

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

  @IsObject()
  sections: {
    header: string;
    description: string;
    images: string[];
  }[];
}
