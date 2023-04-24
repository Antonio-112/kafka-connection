import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from '../src/messages/messages.controller';
import { KafkaService } from '../src/messages/messages.service';
import { KafkaContext } from '@nestjs/microservices';

describe('MessagesController', () => {
  let messagesController: MessagesController;
  let kafkaService: KafkaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: 'IKafkaService',
          useValue: {
            process: jest.fn(),
          },
        },
      ],
    }).compile();

    messagesController = module.get<MessagesController>(MessagesController);
    kafkaService = module.get<KafkaService>('IKafkaService');
  });

  it('should be defined', () => {
    expect(messagesController).toBeDefined();
  });

  describe('publish', () => {
    it('should call kafkaService.process with the provided data', async () => {
      const data = { foo: 'bar' };

      await messagesController.publish(data, {
        getTopic() {
          return 'test-topic';
        },
        getPartition() {
          return 0;
        },
      } as unknown as KafkaContext);

      expect(kafkaService.process).toHaveBeenCalledWith(data);
    });
  });
});
