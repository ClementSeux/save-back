import { Module } from '@nestjs/common';
import { TokenController } from './token/token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { MyBasicStrategy } from './security/strategies/my-basic.strategy';
import { PaymentService } from 'src/payments/payments.service';
import { ProductService } from 'src/products/products.service';
import { BillService } from 'src/bills/bills.service';
import { ProductsModule } from 'src/products/products.module';
import { PaymentsModule } from 'src/payments/payments.module';
import { BillsModule } from 'src/bills/bills.module';
import { UserModule } from 'src/user/user.module';
import { Payment } from 'src/payments/entities/payment.entity';
import { Product } from 'src/products/entities/product.entity';
import { Bill } from 'src/bills/entities/bill.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'banane',
      signOptions: {
        audience: process.env.JWT_AUDIENCE || 'save.com',
      },
    }),
    TypeOrmModule.forFeature([User, JwtModule]),
    UserModule,
    ProductsModule,
    PaymentsModule,
    BillsModule,
  ],
  controllers: [TokenController],
  providers: [
    UserService,
    JwtService,
    MyBasicStrategy,
    PaymentService,
    Payment,
    ProductService,
    Product,
    BillService,
    Bill,
  ],
})
export class AuthModule {}
