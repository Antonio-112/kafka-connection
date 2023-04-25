import { Test, TestingModule } from '@nestjs/testing';
import { ClientsModule, KafkaContext, Transport } from '@nestjs/microservices';
import { MessagesController } from '../../src/messages/messages.controller';
import { KafkaService } from '../../src/messages/messages.service';

describe('MessagesController (e2e)', () => {
  let messagesController: MessagesController;
  let kafkaService: KafkaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'KAFKA_CLUSTER',
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'test',
                brokers: ['localhost:9092'],
              },
              consumer: {
                groupId: 'test-group',
              },
            },
          },
        ]),
      ],
      controllers: [MessagesController],
      providers: [
        {
          provide: 'IKafkaService',
          useClass: KafkaService,
        },
      ],
    }).compile();

    messagesController = module.get<MessagesController>(MessagesController);
    kafkaService = module.get<KafkaService>('IKafkaService');
  });

  it('should process a message from kafka-test-topic', async () => {
    // Prepare
    const data = { key: 'value' };

    const mockKafkaContext = {
      getTopic: jest.fn(() => 'kafka-test-topic'),
      getPartition: jest.fn(() => '0'),
      getMessage: jest.fn(),
      getConsumer: jest.fn(),
      getHeartbeat: jest.fn(),
      getProducer: jest.fn(),
      getResponseQueue: jest.fn(),
      getCorrelationId: jest.fn(),
      getOffset: jest.fn(),
    } as unknown as KafkaContext;

    const processSpy = jest
      .spyOn(kafkaService, 'process')
      .mockImplementation(() => Promise.resolve());

    // Execute
    await messagesController.publish(data, mockKafkaContext as KafkaContext);

    // Assert
    expect(processSpy).toHaveBeenCalledWith(data);
    processSpy.mockRestore();
  });
});
