import { Module } from '@nestjs/common';
import { Custom_noteService } from './custom_notes.service';
import { CustomNotesController } from './custom_notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomNote } from './entities/custom_note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomNote])],
  controllers: [CustomNotesController],
  providers: [Custom_noteService],
})
export class CustomNotesModule {}
