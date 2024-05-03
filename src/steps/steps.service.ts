import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import {
  ConflictException,
  Delete,
  Get,
  Injectable,
  NotFoundException,
  Patch,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Step } from './entities/step.entity';

@Injectable()
export class StepsService {
  constructor(
    @InjectRepository(Step) private readonly stepRepository: Repository<Step>,
  ) {}

  @ApiOperation({ summary: 'Create a step' })
  @ApiCreatedResponse({
    description: 'The step has been successfully created.',
    type: Step,
  })
  @Post()
  async create(createStepDto: CreateStepDto) {
    try {
      return this.stepRepository.save(createStepDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @ApiOperation({ summary: 'Find all steps' })
  @ApiOkResponse({
    description: 'Return all steps.',
    type: Step,
    isArray: true,
  })
  @Get()
  async findAll() {
    return this.stepRepository.find();
  }

  @ApiOperation({ summary: 'Find a step by id' })
  @ApiOkResponse({
    description: 'Return the step.',
    type: Step,
  })
  @ApiNotFoundResponse({
    description: 'The step does not exist.',
  })
  @Get(':id')
  async findOne(id: number) {
    return this.stepRepository.findBy({ id });
  }

  @ApiOperation({ summary: 'Update a step' })
  @ApiNotFoundResponse({
    description: 'The step does not exist.',
  })
  @ApiOkResponse({
    description: 'The step has been successfully updated.',
    type: Step,
  })
  @Patch(':id')
  async update(id: number, updateStepDto: UpdateStepDto) {
    try {
      let done = await this.stepRepository.update(id, updateStepDto);
      if (done.affected != 1) {
        throw new NotFoundException(`User #${id} not found`);
      }
    } catch (e) {
      throw e instanceof NotFoundException
        ? e
        : new ConflictException(e.message);
    }
    return this.findOne(id);
  }

  @ApiOperation({ summary: 'Remove a step' })
  @ApiNotFoundResponse({
    description: 'The step does not exist.',
  })
  @ApiOkResponse({
    description: 'The step has been successfully removed.',
    type: Step,
  })
  @Delete(':id')
  async remove(id: number) {
    const step = await this.stepRepository.findBy({ id });
    if (!step) {
      throw new NotFoundException(`Step #${id} not found`);
    }
    return this.stepRepository.remove(step);
  }
}
