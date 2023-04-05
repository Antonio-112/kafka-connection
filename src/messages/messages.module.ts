import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import kafkaConfig from 'config/kafka.config';
import { MessagesController } from './messages.controller';
import { KafkaProducerService } from './messages.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_CLUSTER',
        transport: Transport.KAFKA,
        options: kafkaConfig.options,
      },
    ]),
  ],
  controllers: [MessagesController],
  providers: [KafkaProducerService],
})
export class MessageModule {}
