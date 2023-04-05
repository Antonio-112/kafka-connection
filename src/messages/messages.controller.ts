import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaProducerService } from './messages.service';

@Controller()
export class MessagesController {
  private readonly _logger = new Logger(MessagesController.name);
  constructor(private readonly kafkaProducerService: KafkaProducerService) {}

  @MessagePattern('kafka-test-topic')
  async publish(
    @Payload() payload: { topic: string; message: string },
  ): Promise<void> {
    const { message, topic } = payload;
    this._logger.debug('Message: ' + message + ' on topic: ' + topic);
    await this.kafkaProducerService.send(topic, message);
  }
}
