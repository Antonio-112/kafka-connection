import { KafkaOptions, Transport } from '@nestjs/microservices';

// Comprueba si SSL está habilitado a través de la variable de entorno KAFKA_SSL
const sslEnabled = process.env.KAFKA_SSL === 'true';

// Define las opciones básicas del cliente de Kafka
const kafkaClientOptions = {
  brokers: [process.env.KAFKA_BROKER], // Lista de brokers de Kafka
};

// Si SSL está habilitado, agrega las opciones SSL y SASL al cliente de Kafka
if (sslEnabled) {
  kafkaClientOptions['ssl'] = true; // Habilita SSL para la conexión
  kafkaClientOptions['sasl'] = {
    mechanism: process.env.KAFKA_SASL_MECHANISM, // Mecanismo SASL para la autenticación (ej. 'plain', 'scram-sha-256', 'scram-sha-512')
    username: process.env.KAFKA_SASL_USERNAME, // Nombre de usuario para la autenticación SASL
    password: process.env.KAFKA_SASL_PASSWORD, // Contraseña para la autenticación SASL
  };
}

// Exporta la configuración de Kafka
export const kafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA, // Utiliza el transporte de Kafka
  options: {
    client: kafkaClientOptions, // Opciones del cliente de Kafka
    consumer: {
      groupId: process.env.KAFKA_CONSUMER_GROUP, // Grupo de consumidores de Kafka
    },
  },
};
