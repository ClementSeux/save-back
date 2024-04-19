import { PartialType } from '@nestjs/swagger';
import { CreateCustomNoteDto } from './create-custom_note.dto';

export class UpdateCustomNoteDto extends PartialType(CreateCustomNoteDto) {}
