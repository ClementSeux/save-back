import { Module } from '@nestjs/common';
import { TokenController } from './token/token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { MyBasicStrategy } from './security/strategies/my-basic.strategy';
import { PaymentService } from 'src/payments/payments.service';
import { Product } from 'src/products/entities/product.entity';
import { ProductService } from 'src/products/products.service';
import { BillService } from 'src/bills/bills.service';

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
  ],
  controllers: [TokenController],
  providers: [
    UserService,
    JwtService,
    MyBasicStrategy,
    PaymentService,
    ProductService,
    BillService,
  ],
})
export class AuthModule {}
