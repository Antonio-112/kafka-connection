import { NestFactory } from '@nestjs/core';
import { kafkaConfig } from 'config/kafka.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, kafkaConfig);
  app.listen();
}

bootstrap();
