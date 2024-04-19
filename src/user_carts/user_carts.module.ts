import { Module } from '@nestjs/common';
import { UserCartsService } from './user_carts.service';
import { UserCartsController } from './user_carts.controller';

@Module({
  controllers: [UserCartsController],
  providers: [UserCartsService],
})
export class UserCartsModule {}
