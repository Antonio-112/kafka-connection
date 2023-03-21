import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<KafkaOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'], // Cambia esta dirección al broker de Kafka que estés utilizando
      },
      consumer: {
        groupId: 'kafka-microservice-group', // Cambia este nombre al grupo de consumidores que desees
      },
    },
  });

  app.listen();
}

bootstrap();
