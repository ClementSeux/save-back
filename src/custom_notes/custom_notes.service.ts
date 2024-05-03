import {
  ConflictException,
  Delete,
  Get,
  Injectable,
  NotFoundException,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCustomNoteDto } from './dto/create-custom_note.dto';
import { UpdateCustomNoteDto } from './dto/update-custom_note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CustomNote } from './entities/custom_note.entity';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Injectable()
export class Custom_noteService {
  constructor(
    @InjectRepository(CustomNote)
    private readonly custom_noteRepository: Repository<CustomNote>,
  ) {}

  @ApiOperation({ summary: 'Create a custom_note' })
  @ApiCreatedResponse({
    description: 'The custom_note has been successfully created.',
    type: CustomNote,
  })
  @Post()
  async create(createCustom_noteDto: CreateCustomNoteDto): Promise<CustomNote> {
    try {
      return await this.custom_noteRepository.save({
        ...createCustom_noteDto,
      });
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @ApiOperation({ summary: 'Find all custom_notes' })
  @ApiOkResponse({
    description: 'Return all custom_notes.',
    type: CustomNote,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<CustomNote[]> {
    return this.custom_noteRepository.find();
  }

  @ApiOperation({ summary: 'Find a custom_note by id' })
  @ApiOkResponse({
    description: 'Return the custom_note.',
    type: CustomNote,
  })
  @Get(':id')
  async findOne(id: number): Promise<CustomNote> {
    const custom_note = await this.custom_noteRepository.findOneBy({ id });
    if (!custom_note) {
      throw new NotFoundException(`Custom_note #${id} not found`);
    }
    return custom_note;
  }

  @ApiOperation({ summary: 'Update a custom_note' })
  @ApiNotFoundResponse({
    description: 'Custom_note not found.',
  })
  @ApiOkResponse({
    description: 'The custom_note has been successfully updated.',
    type: CustomNote,
  })
  @Patch(':id')
  async update(id: number, updateCustom_noteDto: UpdateCustomNoteDto) {
    try {
      let done = await this.custom_noteRepository.update(
        id,
        updateCustom_noteDto,
      );
      if (done.affected != 1) {
        throw new NotFoundException(`Custom_note #${id} not found`);
      }
    } catch (e) {
      throw e instanceof NotFoundException
        ? e
        : new ConflictException(e.message);
    }
    return this.findOne(id);
  }

  @ApiOperation({ summary: 'Remove a custom_note' })
  @ApiNotFoundResponse({
    description: 'Custom_note not found.',
  })
  @ApiOkResponse({
    description: 'The custom_note has been successfully removed.',
  })
  @Delete(':id')
  async remove(id: number): Promise<void> {
    let done = await this.custom_noteRepository.delete(id);
    if (done.affected != 1) {
      throw new NotFoundException(`Custom_note #${id} not found`);
    }
  }
}
