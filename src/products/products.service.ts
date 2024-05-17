import {
  ConflictException,
  Delete,
  Get,
  Injectable,
  NotFoundException,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Bill } from 'src/bills/entities/bill.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  @ApiOperation({ summary: 'Create a product' })
  @ApiCreatedResponse({
    description: 'The product has been successfully created.',
    type: Product,
  })
  @Post()
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.productRepository.save({
        ...createProductDto,
        pName: createProductDto.name,
      });
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @ApiOperation({ summary: 'Find all products' })
  @ApiOkResponse({
    description: 'Return all products.',
    type: Product,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  @ApiOperation({ summary: 'Find a product by id' })
  @ApiOkResponse({
    description: 'Return the product.',
    type: Product,
  })
  @Get(':id')
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  findAllByBill(bill: Bill): Promise<Product[]> {
    return this.productRepository.find({ where: { bills: bill } });
  }

  @ApiOperation({ summary: 'Update a product' })
  @ApiNotFoundResponse({
    description: 'Product not found.',
  })
  @ApiOkResponse({
    description: 'The product has been successfully updated.',
    type: Product,
  })
  @Patch(':id')
  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      let done = await this.productRepository.update(id, updateProductDto);
      if (done.affected != 1) {
        throw new NotFoundException(`Product #${id} not found`);
      }
    } catch (e) {
      throw e instanceof NotFoundException
        ? e
        : new ConflictException(e.message);
    }
    return this.findOne(id);
  }

  @ApiOperation({ summary: 'Remove a product' })
  @ApiNotFoundResponse({
    description: 'Product not found.',
  })
  @ApiOkResponse({
    description: 'The product has been successfully removed.',
  })
  @Delete(':id')
  async remove(id: number): Promise<void> {
    let done = await this.productRepository.delete(id);
    if (done.affected != 1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
  }
}
