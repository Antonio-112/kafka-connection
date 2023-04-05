import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from '../src/messages/messages.controller';
import { KafkaProducerService } from '../src/messages/messages.service';

describe('MessagesController', () => {
  let messagesController: MessagesController;
  let kafkaProducerService: KafkaProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: KafkaProducerService,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    messagesController = module.get<MessagesController>(MessagesController);
    kafkaProducerService =
      module.get<KafkaProducerService>(KafkaProducerService);
  });

  it('should be defined', () => {
    expect(messagesController).toBeDefined();
  });

  describe('publish', () => {
    it('should call kafkaProducerService.send with the provided topic and message', async () => {
      const topic = 'test-topic';
      const message = 'test-message';

      await messagesController.publish({ topic, message });

      expect(kafkaProducerService.send).toHaveBeenCalledWith(topic, message);
    });
  });
});
