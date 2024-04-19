import { Module } from '@nestjs/common';
import { ResellersService } from './resellers.service';
import { ResellersController } from './resellers.controller';

@Module({
  controllers: [ResellersController],
  providers: [ResellersService],
})
export class ResellersModule {}
