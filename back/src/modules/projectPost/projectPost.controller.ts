import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectPostService } from './projectPost.service';
import { ProjectPost } from '@prisma/client';

@ApiTags('project-posts')
@Controller('/project-posts')
export class ProjectPostController {
  constructor(private projectPostService: ProjectPostService) {}

  @Get('/')
  async getAllPosts(): Promise<ProjectPost[]> {
    return this.projectPostService.findAll({});
  }

  @Get('project-post/:id')
  async getPostById(@Param('id') id: string): Promise<ProjectPost> {
    return this.projectPostService.findOne({ id: Number(id) });
  }

  @Post('register')
  async registerPost(
    @Body()
    postData: {
      category: string;
      title: string;
      description: string;
      skills: string[];
    },
  ): Promise<ProjectPost> {
    const { title, description, category, skills } = postData;
    return this.projectPostService.create({
      title,
      description,
      category,
      skills,
    });
  }

  @Delete('project-post/:id')
  async deletePost(@Param('id') id: string): Promise<ProjectPost> {
    return this.projectPostService.delete({ id: Number(id) });
  }
}
