import { Module, Provider } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import kafkaConfig from 'config/kafka.config';
import { MessagesController } from './messages.controller';
import { KafkaService } from './messages.service';

const provider: Provider[] = [
  {
    provide: 'IKafkaService',
    useClass: KafkaService,
  },
];
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
  providers: provider,
})
export class MessageModule {}
