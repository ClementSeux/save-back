import { Test, TestingModule } from '@nestjs/testing';
import { ExclusionsController } from './exclusions.controller';
import { ExclusionsService } from './exclusions.service';

describe('ExclusionsController', () => {
  let controller: ExclusionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExclusionsController],
      providers: [ExclusionsService],
    }).compile();

    controller = module.get<ExclusionsController>(ExclusionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
