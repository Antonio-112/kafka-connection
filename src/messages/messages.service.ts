import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
  private readonly _logger = new Logger(KafkaService.name);
  constructor(@Inject('KAFKA_CLUSTER') private clientKafka: ClientKafka) {}

  async process(data: any): Promise<void> {
    try {
      this._logger.debug('Message to be procesed... data: ' + data);
    } catch (error) {
      throw new Error(`Failed to process message to Kafka: ${error.message}`);
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
