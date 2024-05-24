import { Module } from '@nestjs/common';
import { ExclusionsService } from './exclusions.service';
import { ExclusionsController } from './exclusions.controller';
import { Exclusion } from './entities/exclusion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Exclusion])],
  controllers: [ExclusionsController],
  providers: [ExclusionsService],
})
export class ExclusionsModule {}
