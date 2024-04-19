import { Test, TestingModule } from '@nestjs/testing';
import { UserCartsController } from './user_carts.controller';
import { UserCartsService } from './user_carts.service';

describe('UserCartsController', () => {
  let controller: UserCartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCartsController],
      providers: [UserCartsService],
    }).compile();

    controller = module.get<UserCartsController>(UserCartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
