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
  async getProjectById(@Param('id') projectId: string): Promise<UserProject> {
    return this.userProjectService.findOne({ projectId });
  }

  @Post('register')
  async registerProject(
    @Body()
    data: RegisterUserProjectDTO,
  ): Promise<UserProject> {
    return this.userProjectService.createProject(data);
  }

  @Delete('userProject/:id')
  async deleteProject(@Param('id') projectId: string): Promise<UserProject> {
    return this.userProjectService.deleteProject({ projectId });
  }
}
