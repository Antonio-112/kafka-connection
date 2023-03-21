import { Test, TestingModule } from '@nestjs/testing';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaProducerService } from '../src/messages/messages.service';

describe('KafkaProducerService', () => {
  let service: KafkaProducerService;
  let clientKafka: ClientKafka;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KafkaProducerService,
        {
          provide: 'KAFKA_PRODUCER',
          useValue: {
            connect: jest.fn(),
            send: jest.fn(),
            close: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<KafkaProducerService>(KafkaProducerService);
    clientKafka = module.get<ClientKafka>('KAFKA_PRODUCER');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send a message to Kafka', async () => {
    const topic = 'test-topic';
    const message = { foo: 'bar' };

    await service.send(topic, message);

    expect(clientKafka.send).toHaveBeenCalledWith(
      { topic: topic, messages: [{ value: JSON.stringify(message) }] },
      topic,
    );
  });

  it('should handle errors when sending a message to Kafka', async () => {
    const topic = 'test-topic';
    const message = { foo: 'bar' };
    const error = new Error(
      'Failed to send message to Kafka: Failed to send message',
    );

    (clientKafka.send as jest.Mock).mockRejectedValue(error);

    await expect(service.send(topic, message)).rejects.toThrow(
      /Failed to send message to Kafka/,
    );
  });

  it('should disconnect from Kafka on application shutdown', async () => {
    await service.onApplicationShutdown();

    expect(clientKafka.close).toHaveBeenCalled();
  });

  it('should handle errors when disconnecting from Kafka on application shutdown', async () => {
    const error = new Error(
      'Failed to disconnect from Kafka: Failed to disconnect from Kafka',
    );

    (clientKafka.close as jest.Mock).mockRejectedValue(error);

    await expect(service.onApplicationShutdown()).rejects.toMatchObject({
      message: expect.stringContaining('Failed to disconnect from Kafka'),
    });
  });
});
