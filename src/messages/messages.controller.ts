import { Controller, Inject, Logger } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { KafkaService } from './messages.service';

@Controller()
export class MessagesController {
  private readonly _logger = new Logger(MessagesController.name);
  constructor(
    @Inject('IKafkaService') private readonly kafkaService: KafkaService,
  ) {}

  @MessagePattern('kafka-test-topic')
  async publish(
    @Payload() data: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    this._logger.debug(
      'Data: ' +
        data +
        ' Topic: ' +
        context.getTopic() +
        ' Partition: ' +
        context.getPartition(),
    );
    await this.kafkaService.process(data);
  }
}
