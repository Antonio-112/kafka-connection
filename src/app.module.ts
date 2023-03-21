import { Module } from '@nestjs/common';
import { MessageModule } from './messages/messages.module';

@Module({
  imports: [MessageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
