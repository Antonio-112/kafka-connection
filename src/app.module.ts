import { Module } from '@nestjs/common';
import { MessagesController } from './messages/messages.controller';
import { MessagesService } from './messages/messages.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class AppModule {}
