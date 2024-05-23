import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserCartsService } from './user_carts.service';
import { CreateUserCartDto } from './dto/create-user_cart.dto';
import { UpdateUserCartDto } from './dto/update-user_cart.dto';

@Controller('user-carts')
export class UserCartsController {
  constructor(private readonly userCartsService: UserCartsService) {}

  @Post()
  async create(@Body() createUserCartDto: CreateUserCartDto) {
    try {
      return this.userCartsService.create(createUserCartDto);
    } catch (error) {
      return error;
    }
  }

  @Get()
  async findAll() {
    try {
      return this.userCartsService.findAll();
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return this.userCartsService.findOne(+id);
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserCartDto: UpdateUserCartDto,
  ) {
    return this.userCartsService.update(+id, updateUserCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userCartsService.remove(+id);
  }
}
