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
  create(@Body() createUserCartDto: CreateUserCartDto) {
    return this.userCartsService.create(createUserCartDto);
  }

  @Get()
  findAll() {
    return this.userCartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userCartsService.findOne(+id);
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
