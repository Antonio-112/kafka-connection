import { NestFactory } from '@nestjs/core';
import kafkaConfig from 'config/kafka.config';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

// Cargar las variables de entorno del archivo .env
dotenv.config();

async function bootstrap() {
  // Crear el microservicio utilizando el módulo de la aplicación y la configuración de Kafka
  const app = await NestFactory.createMicroservice(AppModule, kafkaConfig);

  // Variables de entorno requeridas
  const requiredEnvVars = [
    'KAFKA_BROKER',
    'DEFAULT_KAFKA_BROKER_URL',
    'KAFKA_CONNECTION_TIMEOUT',
    'KAFKA_REQUEST_TIMEOUT',
    'KAFKA_RETRY_INITIAL_TIME',
    'KAFKA_MAX_RETRIES',
  ];

  // Verificar que todas las variables de entorno requeridas estén definidas
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }

  // Escuchar y procesar mensajes de Kafka
  app.listen();
}

// Iniciar el microservicio
bootstrap();
