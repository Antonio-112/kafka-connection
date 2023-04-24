import { Controller, Inject, Logger } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { KafkaService } from './messages.service';

// Controlador para procesar mensajes de Kafka
@Controller()
export class MessagesController {
  // Logger personalizado para este controlador
  private readonly _logger = new Logger(MessagesController.name);

  // Inyección del servicio de Kafka
  constructor(
    @Inject('IKafkaService') private readonly kafkaService: KafkaService,
  ) {}

  // Escucha y procesa mensajes del tópico 'kafka-test-topic'
  @MessagePattern('kafka-test-topic')
  async publish(
    @Payload() data: any, // Datos recibidos del mensaje
    @Ctx() context: KafkaContext, // Contexto del mensaje de Kafka
  ): Promise<void> {
    // Registrar información relevante del mensaje
    this._logger.debug(
      `Data: ${data} Topic: ${context.getTopic()} Partition: ${context.getPartition()}`,
    );

    // Procesar los datos utilizando el servicio de Kafka
    await this.kafkaService.process(data);
  }
}
