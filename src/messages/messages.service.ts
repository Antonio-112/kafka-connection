import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
  private readonly _logger = new Logger(KafkaService.name);
  constructor(@Inject('KAFKA_CLUSTER') private clientKafka: ClientKafka) {}

  // Envía un mensaje al broker de Kafka
  // TODO: envio de mensaje a un rabbit
  // TODO: Guardar en base de datos
  async send(_data: any): Promise<void> {
    try {
      /*       await this.clientKafka.send(
        {
          topic: topic,
          messages: [{ value: JSON.stringify(message) }],
        },
        topic,
      ); */
      this._logger.debug('Message to be procesed...');
    } catch (error) {
      throw new Error(`Failed to send message to Kafka: ${error.message}`);
    }
  }

  // Se ejecuta cuando la aplicación se apaga
  async onApplicationShutdown() {
    try {
      await this.clientKafka.close();
      this._logger.log('Disconnected from Kafka');
    } catch (error) {
      throw new Error(`Failed to disconnect from Kafka: ${error.message}`);
    }
  }
}
