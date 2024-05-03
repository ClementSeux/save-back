import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Custom_noteService } from './custom_notes.service';
import { CreateCustomNoteDto } from './dto/create-custom_note.dto';
import { UpdateCustomNoteDto } from './dto/update-custom_note.dto';

@Controller('custom-notes')
export class CustomNotesController {
  constructor(private readonly customNotesService: Custom_noteService) {}

  @Post()
  create(@Body() createCustomNoteDto: CreateCustomNoteDto) {
    return this.customNotesService.create(createCustomNoteDto);
  }

  @Get()
  findAll() {
    return this.customNotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customNotesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomNoteDto: UpdateCustomNoteDto,
  ) {
    return this.customNotesService.update(+id, updateCustomNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customNotesService.remove(+id);
  }
}
