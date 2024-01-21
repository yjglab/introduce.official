import {
  IsArray,
  IsBoolean,
  IsObject,
  IsString,
  IsUUID,
} from 'class-validator';

export class RegisterUserProjectDTO {
  @IsString()
  category: string;
  @IsString()
  title: string;
  @IsString()
  subtitle: string;
  @IsString()
  thumbnail: string;
  @IsString()
  description: string;
  @IsObject()
  Source: {
    link: string;
    name: string;
    owner: string;
  };
  @IsArray()
  skills: string[];

  @IsArray()
  Sections: {
    name: string;
    description: string;
    SectionImages?: {
      src: string;
      alt: string;
    }[];
    Keywords?: {
      name: string;
      description: string;
      image?: {
        src: string;
        alt: string;
      };
    }[];
  }[];

  @IsBoolean()
  private: boolean;

  @IsUUID()
  userId: string;
}
