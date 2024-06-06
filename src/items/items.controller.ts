import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { QueryPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Item } from './entities/item.entity';
import { Roles } from 'src/auth/security/roles.decorator';
import { Role } from 'src/user/enums/role.enums';
import { RolesGuard } from 'src/auth/security/roles.guard';
import { UseGuards } from '@nestjs/common';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EXPERT)
  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EXPERT)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(
      +id,
      updateItemDto as QueryPartialEntity<Item>,
    );
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
