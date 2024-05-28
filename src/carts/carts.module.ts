import { Module } from '@nestjs/common';
import { CartService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, User])],
  controllers: [CartsController],
  providers: [CartService, UserService],
})
export class CartsModule {}
