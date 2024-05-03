import {
  ConflictException,
  Delete,
  Get,
  Injectable,
  NotFoundException,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateResellerDto } from './dto/create-reseller.dto';
import { UpdateResellerDto } from './dto/update-reseller.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Reseller } from './entities/reseller.entity';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Injectable()
export class ResellerService {
  constructor(
    @InjectRepository(Reseller)
    private readonly resellerRepository: Repository<Reseller>,
  ) {}

  @ApiOperation({ summary: 'Create a reseller' })
  @ApiCreatedResponse({
    description: 'The reseller has been successfully created.',
    type: Reseller,
  })
  @Post()
  async create(createResellerDto: CreateResellerDto): Promise<Reseller> {
    try {
      return await this.resellerRepository.save({
        ...createResellerDto,
        rName: createResellerDto.name,
      });
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @ApiOperation({ summary: 'Find all resellers' })
  @ApiOkResponse({
    description: 'Return all resellers.',
    type: Reseller,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<Reseller[]> {
    return this.resellerRepository.find();
  }

  @ApiOperation({ summary: 'Find a reseller by id' })
  @ApiOkResponse({
    description: 'Return the reseller.',
    type: Reseller,
  })
  @Get(':id')
  async findOne(id: number): Promise<Reseller> {
    const reseller = await this.resellerRepository.findOneBy({ id });
    if (!reseller) {
      throw new NotFoundException(`Reseller #${id} not found`);
    }
    return reseller;
  }

  @ApiOperation({ summary: 'Update a reseller' })
  @ApiNotFoundResponse({
    description: 'Reseller not found.',
  })
  @ApiOkResponse({
    description: 'The reseller has been successfully updated.',
    type: Reseller,
  })
  @Patch(':id')
  async update(
    id: number,
    updateResellerDto: QueryDeepPartialEntity<Reseller>,
  ): Promise<Reseller> {
    try {
      let done = await this.resellerRepository.update(id, updateResellerDto);
      if (done.affected != 1) {
        throw new NotFoundException(`Reseller #${id} not found`);
      }
    } catch (e) {
      throw e instanceof NotFoundException
        ? e
        : new ConflictException(e.message);
    }
    return this.findOne(id);
  }

  @ApiOperation({ summary: 'Remove a reseller' })
  @ApiNotFoundResponse({
    description: 'Reseller not found.',
  })
  @ApiOkResponse({
    description: 'The reseller has been successfully removed.',
  })
  @Delete(':id')
  async remove(id: number): Promise<void> {
    let done = await this.resellerRepository.delete(id);
    if (done.affected != 1) {
      throw new NotFoundException(`Reseller #${id} not found`);
    }
  }
}
