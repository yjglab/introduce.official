import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectSourceService } from './projectSource.service';

@ApiTags('')
@Controller('')
export class ProjectSourceController {
  constructor(private projectSourceService: ProjectSourceService) {}
}
