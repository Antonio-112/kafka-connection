import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('AppModule', () => {
  let module: AppModule;

  beforeEach(async () => {
    const appModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    module = appModule.get<AppModule>(AppModule);
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
