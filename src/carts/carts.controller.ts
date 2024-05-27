import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Head,
} from '@nestjs/common';
import { CartService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Headers } from '@nestjs/common';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartService) {}

  @Post()
  create(
    @Body() createCartDto: CreateCartDto,
    @Headers('authorization') authHeader: string,
  ) {
    return this.cartsService.create(authHeader, createCartDto);
  }

  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }
}
