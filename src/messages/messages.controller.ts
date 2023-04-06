import { Controller, Inject, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaService } from './messages.service';

@Controller()
export class MessagesController {
  private readonly _logger = new Logger(MessagesController.name);
  constructor(
    @Inject('IKafkaService') private readonly kafkaService: KafkaService,
  ) {}

  @MessagePattern('kafka-test-topic')
  async publish(
    @Payload() payload: { topic: string; message: string },
  ): Promise<void> {
    const { message, topic } = payload;
    this._logger.debug('Message: ' + message + ' on topic: ' + topic);
    await this.kafkaService.send(topic, message);
  }
}
