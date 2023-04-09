/* import { KafkaContext } from '@nestjs/microservices';
 */ import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from '../src/messages/messages.controller';
/* import { KafkaService } from '../src/messages/messages.service';
 */
describe('MessagesController', () => {
  let messagesController: MessagesController;
  /*   let kafkaService: KafkaService;
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: 'IKafkaService',
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    messagesController = module.get<MessagesController>(MessagesController);
    /*     kafkaService = module.get<KafkaService>('IKafkaService'); */
  });

  it('should be defined', () => {
    expect(messagesController).toBeDefined();
  });

  // TODO: Fix this test
  /* describe('publish', () => {
    it('should call kafkaService.send with the provided topic and message', async () => {
      const topic = 'test-topic';
      const message = 'test-message';

      await messagesController.publish({ topic, message }, {
        getTopic() {
          return '';
        },
        getPartition() {
          return '';
        },
      } as unknown as KafkaContext);

      expect(kafkaService.process).toHaveBeenCalledWith({ topic, message });
    });
  }); */
});
