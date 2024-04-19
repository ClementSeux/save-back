import { Test, TestingModule } from '@nestjs/testing';
import { CustomNotesService } from './custom_notes.service';

describe('CustomNotesService', () => {
  let service: CustomNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomNotesService],
    }).compile();

    service = module.get<CustomNotesService>(CustomNotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
