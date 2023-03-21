import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagesService } from './messages.service';

@Controller()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @MessagePattern('messages.topic') // Cambia este valor al nombre del topic que desees
  async handleMessage(@Payload() message: any): Promise<void> {
    this.messagesService.handleMessage(message.value);
  }
}
