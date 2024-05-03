import {
  ConflictException,
  Delete,
  Get,
  Injectable,
  NotFoundException,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  @ApiOperation({ summary: 'Create a cart' })
  @ApiCreatedResponse({
    description: 'The cart has been successfully created.',
    type: Cart,
  })
  @Post()
  async create(createCartDto: CreateCartDto): Promise<Cart> {
    try {
      return await this.cartRepository.save({
        ...createCartDto,
      });
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @ApiOperation({ summary: 'Find all carts' })
  @ApiOkResponse({
    description: 'Return all carts.',
    type: Cart,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<Cart[]> {
    return this.cartRepository.find();
  }

  @ApiOperation({ summary: 'Find a cart by id' })
  @ApiOkResponse({
    description: 'Return the cart.',
    type: Cart,
  })
  @Get(':id')
  async findOne(id: number): Promise<Cart> {
    const cart = await this.cartRepository.findOneBy({ id });
    if (!cart) {
      throw new NotFoundException(`Cart #${id} not found`);
    }
    return cart;
  }

  @ApiOperation({ summary: 'Update a cart' })
  @ApiNotFoundResponse({
    description: 'Cart not found.',
  })
  @ApiOkResponse({
    description: 'The cart has been successfully updated.',
    type: Cart,
  })
  @Patch(':id')
  async update(id: number, updateCartDto: UpdateCartDto) {
    try {
      let done = await this.cartRepository.update(id, updateCartDto);
      if (done.affected != 1) {
        throw new NotFoundException(`Cart #${id} not found`);
      }
    } catch (e) {
      throw e instanceof NotFoundException
        ? e
        : new ConflictException(e.message);
    }
    return this.findOne(id);
  }

  @ApiOperation({ summary: 'Remove a cart' })
  @ApiNotFoundResponse({
    description: 'Cart not found.',
  })
  @ApiOkResponse({
    description: 'The cart has been successfully removed.',
  })
  @Delete(':id')
  async remove(id: number): Promise<void> {
    let done = await this.cartRepository.delete(id);
    if (done.affected != 1) {
      throw new NotFoundException(`Cart #${id} not found`);
    }
  }
}
