import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';

export class RegisterProjectPostDTO {
  @IsNumber()
  userEmail: number;

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

  @IsArray()
  sections: {
    header: string;
    description: string;
    images: string[];
  }[];
}
