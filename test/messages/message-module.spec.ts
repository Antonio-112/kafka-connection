import { Test, TestingModule } from '@nestjs/testing';
import { MessageModule } from '../../src/messages/messages.module';

describe('MessageModule', () => {
  let module: MessageModule;

  beforeEach(async () => {
    const messageModule: TestingModule = await Test.createTestingModule({
      imports: [MessageModule],
    }).compile();

    module = messageModule.get<MessageModule>(MessageModule);
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
