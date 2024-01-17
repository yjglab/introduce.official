import { Module } from '@nestjs/common';

import { ChatService } from './chat.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [AuthModule, UserModule],
  providers: [ChatService],
})
export class ChatModule {}
