import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Reseller } from 'src/resellers/entities/reseller.entity';
import { Cart } from 'src/carts/entities/cart.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Bill } from 'src/bills/entities/bill.entity';
import { CustomNote } from 'src/custom_notes/entities/custom_note.entity';
import { Item } from 'src/items/entities/item.entity';
import { Product } from 'src/products/entities/product.entity';
import { Step } from 'src/steps/entities/step.entity';
import { UserCart } from 'src/user_carts/entities/user_cart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Reseller,
      Cart,
      Payment,
      Bill,
      CustomNote,
      Item,
      Product,
      Step,
      UserCart,
    ]),
  ],

  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
