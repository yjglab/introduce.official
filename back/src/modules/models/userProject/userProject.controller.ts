import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserProject } from '@prisma/client';
import { UserProjectService } from './userProject.service';
import { RegisterUserProjectDTO } from './userProject.dto';

@ApiTags('userProject')
@Controller('/userProject')
export class UserProjectController {
  constructor(private userProjectService: UserProjectService) {}

  @Get('userProject/:id')
  async getPostById(@Param('id') id: number): Promise<UserProject> {
    return this.userProjectService.findOne({ id });
  }

  @Post('register')
  async registerPost(
    @Body()
    data: RegisterUserProjectDTO,
  ): Promise<UserProject> {
    const {
      userEmail,
      category,
      title,
      subTitle,
      thumbnail,
      description,
      source,
      skills,
      sections,
    } = data;

    return this.userProjectService.createPost({
      userEmail,
      category,
      title,
      subTitle,
      thumbnail,
      description,
      source,
      skills,
      sections,
    });
  }

  @Delete('userProject/:id')
  async deletePost(@Param('id') id: string): Promise<UserProject> {
    return this.userProjectService.deletePost({ id: Number(id) });
  }
}
