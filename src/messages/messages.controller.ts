import { Controller, Post, Body } from '@nestjs/common';
import { KafkaProducerService } from './messages.service';

@Controller()
export class MessagesController {
  constructor(private readonly kafkaProducerService: KafkaProducerService) {}

  @Post('publish')
  async publish(
    @Body('topic') topic: string,
    @Body('message') message: string,
  ): Promise<void> {
    await this.kafkaProducerService.send(topic, message);
  }
}
