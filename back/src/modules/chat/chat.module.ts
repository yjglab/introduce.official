import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { ChatService } from './chat.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  providers: [ChatService],
})
export class ChatModule {}
