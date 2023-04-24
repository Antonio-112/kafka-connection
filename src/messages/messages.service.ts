import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

// Servicio de Kafka para procesar mensajes
@Injectable()
export class KafkaService {
  // Logger personalizado para este servicio
  private readonly _logger = new Logger(KafkaService.name);

  // Inyección del cliente de Kafka
  constructor(@Inject('KAFKA_CLUSTER') private clientKafka: ClientKafka) {}

  // Procesa los datos recibidos del controlador de mensajes
  async process(data: any): Promise<void> {
    try {
      // Registrar información de los datos a procesar
      this._logger.debug(`Message to be processed... data: ${data}`);
    } catch (error) {
      // Propagar el error en caso de fallo al procesar el mensaje
      throw new Error(`Failed to process message to Kafka: ${error.message}`);
    }
  }

  // Método para desconectarse de Kafka al cerrar la aplicación
  async onApplicationShutdown() {
    try {
      // Cerrar la conexión con el cliente de Kafka
      await this.clientKafka.close();

      // Registrar la desconexión exitosa de Kafka
      this._logger.log('Disconnected from Kafka');
    } catch (error) {
      // Propagar el error en caso de fallo al desconectar de Kafka
      throw new Error(`Failed to disconnect from Kafka: ${error.message}`);
    }
  }
}
