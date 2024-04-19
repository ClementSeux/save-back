import { Injectable } from '@nestjs/common';
import { CreateCustomNoteDto } from './dto/create-custom_note.dto';
import { UpdateCustomNoteDto } from './dto/update-custom_note.dto';

@Injectable()
export class CustomNotesService {
  create(createCustomNoteDto: CreateCustomNoteDto) {
    return 'This action adds a new customNote';
  }

  findAll() {
    return `This action returns all customNotes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customNote`;
  }

  update(id: number, updateCustomNoteDto: UpdateCustomNoteDto) {
    return `This action updates a #${id} customNote`;
  }

  remove(id: number) {
    return `This action removes a #${id} customNote`;
  }
}
