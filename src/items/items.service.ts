import {
  ConflictException,
  Delete,
  Get,
  Injectable,
  NotFoundException,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { QueryPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}

  @ApiOperation({ summary: 'Create a item' })
  @ApiCreatedResponse({
    description: 'The item has been successfully created.',
    type: Item,
  })
  @Post()
  async create(createItemDto: CreateItemDto): Promise<Item> {
    try {
      return await this.itemRepository.save({
        ...createItemDto,
        iName: createItemDto.name,
      });
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @ApiOperation({ summary: 'Find all items' })
  @ApiOkResponse({
    description: 'Return all items.',
    type: Item,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  @ApiOperation({ summary: 'Find a item by id' })
  @ApiOkResponse({
    description: 'Return the item.',
    type: Item,
  })
  @Get(':id')
  async findOne(id: number): Promise<Item> {
    const item = await this.itemRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Item #${id} not found`);
    }
    return item;
  }

  @ApiOperation({ summary: 'Update a item' })
  @ApiNotFoundResponse({
    description: 'Item not found.',
  })
  @ApiOkResponse({
    description: 'The item has been successfully updated.',
    type: Item,
  })
  @Patch(':id')
  async update(id: number, updateItemDto: QueryPartialEntity<Item>) {
    try {
      let done = await this.itemRepository.update(id, updateItemDto);
      if (done.affected != 1) {
        throw new NotFoundException(`Item #${id} not found`);
      }
    } catch (e) {
      throw e instanceof NotFoundException
        ? e
        : new ConflictException(e.message);
    }
    return this.findOne(id);
  }

  @ApiOperation({ summary: 'Remove a item' })
  @ApiNotFoundResponse({
    description: 'Item not found.',
  })
  @ApiOkResponse({
    description: 'The item has been successfully removed.',
  })
  @Delete(':id')
  async remove(id: number): Promise<void> {
    let done = await this.itemRepository.delete(id);
    if (done.affected != 1) {
      throw new NotFoundException(`Item #${id} not found`);
    }
  }
}
