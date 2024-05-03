import { Module } from '@nestjs/common';
import { ResellerService } from './resellers.service';
import { ResellersController } from './resellers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reseller } from './entities/reseller.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reseller])],
  controllers: [ResellersController],
  providers: [ResellerService],
})
export class ResellersModule {}
