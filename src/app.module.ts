import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsModule } from './carts/carts.module';
import { ResellersModule } from './resellers/resellers.module';
import { StepsModule } from './steps/steps.module';
import { ItemsModule } from './items/items.module';
import { BillsModule } from './bills/bills.module';
import { ProductsModule } from './products/products.module';
import { PaymentsModule } from './payments/payments.module';
import { UserCartsModule } from './user_carts/user_carts.module';
import { CustomNotesModule } from './custom_notes/custom_notes.module';
import { AuthModule } from './auth/auth.module';
import { TokenController } from './auth/token/token.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: process.env.ENV === 'prodmysql' ? 'mysql' : 'mariadb',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT || 3307,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: process.env.ENV === 'dev',
    }),
    UserModule,
    CartsModule,
    ResellersModule,
    StepsModule,
    ItemsModule,
    BillsModule,
    ProductsModule,
    PaymentsModule,
    UserCartsModule,
    CustomNotesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
//
console.log('process.env.DB_HOST', process.env.DB_HOST);
console.log('process.env.DB_PORT', process.env.DB_PORT);
console.log('process.env.DB_USER', process.env.DB_USER);
console.log('process.env.DB_PASS', process.env.DB_PASS);
console.log('process.env.DB_NAME', process.env.DB_NAME);
