import { Controller, Post, Body, Logger } from '@nestjs/common';
import { KafkaProducerService } from './messages.service';

@Controller()
export class MessagesController {
  private readonly _logger = new Logger(MessagesController.name);
  constructor(private readonly kafkaProducerService: KafkaProducerService) {}

  @Post('publish')
  async publish(
    @Body('topic') topic: string,
    @Body('message') message: string,
  ): Promise<void> {
    this._logger.debug('Message: ' + message + ' on topic: ' + topic);
    await this.kafkaProducerService.send(topic, message);
  }
}
