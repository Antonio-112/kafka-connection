import { KafkaOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

/* 
  
const fs = require('fs');

const kafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'nestjs-kafka-producer',
      brokers: [
        process.env.KAFKA_BROKER || process.env.DEFAULT_KAFKA_BROKER_URL,
      ],
      ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(process.env.KAFKA_CA_CERT),
        key: fs.readFileSync(process.env.KAFKA_CLIENT_KEY),
        cert: fs.readFileSync(process.env.KAFKA_CLIENT_CERT),
      },
    },
  },
};

*/

/*
  const kafkaConfig: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'nestjs-kafka-producer',
        brokers: [
          process.env.KAFKA_BROKER || process.env.DEFAULT_KAFKA_BROKER_URL,
        ],
        sasl: {
          mechanism: 'PLAIN',
          username: process.env.KAFKA_USERNAME,
          password: process.env.KAFKA_PASSWORD,
        },
        authorizationRoles: ['read', 'write'],
      },
    },
  };
 */

const kafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'nestjs-kafka-producer',
      brokers: [
        process.env.KAFKA_BROKER || process.env.DEFAULT_KAFKA_BROKER_URL,
      ],
      connectionTimeout:
        parseInt(process.env.KAFKA_CONNECTION_TIMEOUT, 10) || 5000,
      requestTimeout: parseInt(process.env.KAFKA_REQUEST_TIMEOUT, 10) || 60000,
      retry: {
        initialRetryTime:
          parseInt(process.env.KAFKA_RETRY_INITIAL_TIME, 10) || 1000,
        retries: parseInt(process.env.KAFKA_MAX_RETRIES, 10) || 10,
      },
    },
    producer: {
      idempotent: true,
    },
  },
};

export default kafkaConfig;
