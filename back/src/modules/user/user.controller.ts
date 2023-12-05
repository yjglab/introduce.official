import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AccountStatus } from '@common/enums';
import { JwtAuthGuard, VerifiedGuard } from '@common/guards';
import { CurrentUser, Verified as Status } from '@common/decorators';
import { UserService } from './user.service';
import { UpdateUserDto } from './user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Status(AccountStatus.VERIFIED)
  @UseGuards(JwtAuthGuard, VerifiedGuard)
  @Patch('update')
  updateProfile(
    @CurrentUser('id') id: number,
    @Body() updateData: UpdateUserDto,
  ) {
    return this.userService.updateProfile(id, updateData);
  }
}
