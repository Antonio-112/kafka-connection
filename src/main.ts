import { NestFactory } from '@nestjs/core';
import kafkaConfig from 'config/kafka.config';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, kafkaConfig);

  const requiredEnvVars = [
    'KAFKA_BROKER',
    'DEFAULT_KAFKA_BROKER_URL',
    'KAFKA_CONNECTION_TIMEOUT',
    'KAFKA_REQUEST_TIMEOUT',
    'KAFKA_RETRY_INITIAL_TIME',
    'KAFKA_MAX_RETRIES',
  ];
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }
  app.listen();
}

bootstrap();
