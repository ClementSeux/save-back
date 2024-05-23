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
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('user-carts')
export class UserCartsController {
  constructor(private readonly userCartsService: UserCartsService) {}

  @ApiOperation({ summary: 'Create a user cart' })
  @ApiOkResponse({
    description: 'The user cart has been successfully created.',
    type: CreateUserCartDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  async create(@Body() createUserCartDto: CreateUserCartDto) {
    try {
      return this.userCartsService.create(createUserCartDto);
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({ summary: 'Get all user carts' })
  @ApiOkResponse({
    description: 'All user carts.',
    type: [CreateUserCartDto],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  async findAll() {
    try {
      return this.userCartsService.findAll();
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({ summary: 'Get a user cart by id' })
  @ApiOkResponse({
    description: 'A user cart.',
    type: CreateUserCartDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return this.userCartsService.findOne(+id);
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({ summary: 'Update a user cart by id' })
  @ApiOkResponse({
    description: 'The user cart has been successfully updated.',
    type: UpdateUserCartDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserCartDto: UpdateUserCartDto,
  ) {
    return this.userCartsService.update(+id, updateUserCartDto);
  }

  @ApiOperation({ summary: 'Delete a user cart by id' })
  @ApiOkResponse({
    description: 'The user cart has been successfully removed.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userCartsService.remove(+id);
  }
}
