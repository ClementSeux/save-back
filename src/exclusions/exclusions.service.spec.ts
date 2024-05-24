import { Test, TestingModule } from '@nestjs/testing';
import { ExclusionsService } from './exclusions.service';

describe('ExclusionsService', () => {
  let service: ExclusionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExclusionsService],
    }).compile();

    service = module.get<ExclusionsService>(ExclusionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
