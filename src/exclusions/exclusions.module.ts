import { Module } from '@nestjs/common';
import { ExclusionsService } from './exclusions.service';
import { ExclusionsController } from './exclusions.controller';

@Module({
  controllers: [ExclusionsController],
  providers: [ExclusionsService],
})
export class ExclusionsModule {}
