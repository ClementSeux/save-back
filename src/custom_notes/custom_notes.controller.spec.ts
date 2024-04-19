import { Test, TestingModule } from '@nestjs/testing';
import { CustomNotesController } from './custom_notes.controller';
import { CustomNotesService } from './custom_notes.service';

describe('CustomNotesController', () => {
  let controller: CustomNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomNotesController],
      providers: [CustomNotesService],
    }).compile();

    controller = module.get<CustomNotesController>(CustomNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
