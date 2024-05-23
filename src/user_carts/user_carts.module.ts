import { Module } from '@nestjs/common';
import { UserCartsService } from './user_carts.service';
import { UserCartsController } from './user_carts.controller';
import { UserCart } from './entities/user_cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserCartsController],
  providers: [UserCartsService],
  imports: [TypeOrmModule.forFeature([UserCart])],
})
export class UserCartsModule {}
