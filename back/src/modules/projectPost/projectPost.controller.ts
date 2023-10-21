import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectPostService } from './projectPost.service';
import { ProjectPost } from '@prisma/client';
import { RegisterProjectPostDTO } from './projectPost.dto';

@ApiTags('project-posts')
@Controller('/project-posts')
export class ProjectPostController {
  constructor(private projectPostService: ProjectPostService) {}

  // @Get('/')
  // async getAllPosts(): Promise<ProjectPost[]> {
  //   return this.projectPostService.findAll({});
  // }

  @Get('project-post/:id')
  async getPostById(@Param('id') id: number): Promise<ProjectPost> {
    return this.projectPostService.findOne({ id });
  }

  @Post('register')
  async registerPost(
    @Body()
    data: RegisterProjectPostDTO,
  ): Promise<ProjectPost> {
    const {
      userEmail,
      category,
      title,
      description,
      source,
      skills,
      sections,
    } = data;

    return this.projectPostService.create({
      userEmail,
      category,
      title,
      description,
      source,
      skills,
      sections,
    });
  }

  @Delete('project-post/:id')
  async deletePost(@Param('id') id: string): Promise<ProjectPost> {
    return this.projectPostService.delete({ id: Number(id) });
  }
}
