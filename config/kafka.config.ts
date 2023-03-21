import { KafkaOptions, Transport } from '@nestjs/microservices';

const sslEnabled = process.env.KAFKA_SSL === 'true';

const kafkaClientOptions = {
  brokers: [process.env.KAFKA_BROKER],
};

if (sslEnabled) {
  kafkaClientOptions['ssl'] = true;
  kafkaClientOptions['sasl'] = {
    mechanism: process.env.KAFKA_SASL_MECHANISM,
    username: process.env.KAFKA_SASL_USERNAME,
    password: process.env.KAFKA_SASL_PASSWORD,
  };
}

export const kafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: kafkaClientOptions,
    consumer: {
      groupId: process.env.KAFKA_CONSUMER_GROUP,
    },
  },
};
