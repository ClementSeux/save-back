import { Module } from '@nestjs/common';
import { CustomNotesService } from './custom_notes.service';
import { CustomNotesController } from './custom_notes.controller';

@Module({
  controllers: [CustomNotesController],
  providers: [CustomNotesService],
})
export class CustomNotesModule {}
