import { Module, Provider } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import kafkaConfig from 'config/kafka.config';
import { MessagesController } from './messages.controller';
import { KafkaService } from './messages.service';

// Definición del proveedor para el servicio de Kafka
const provider: Provider[] = [
  {
    provide: 'IKafkaService',
    useClass: KafkaService,
  },
];

// Módulo de mensajes para NestJS, incluye controlador, servicio y configuración de Kafka
@Module({
  imports: [
    // Registro del módulo del cliente de Kafka
    ClientsModule.register([
      {
        name: 'KAFKA_CLUSTER',
        transport: Transport.KAFKA,
        options: kafkaConfig.options,
      },
    ]),
  ],
  controllers: [MessagesController], // Controlador para procesar mensajes de Kafka
  providers: provider, // Proveedor del servicio de Kafka
})
export class MessageModule {}
