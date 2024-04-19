import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResellersService } from './resellers.service';
import { CreateResellerDto } from './dto/create-reseller.dto';
import { UpdateResellerDto } from './dto/update-reseller.dto';

@Controller('resellers')
export class ResellersController {
  constructor(private readonly resellersService: ResellersService) {}

  @Post()
  create(@Body() createResellerDto: CreateResellerDto) {
    return this.resellersService.create(createResellerDto);
  }

  @Get()
  findAll() {
    return this.resellersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resellersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResellerDto: UpdateResellerDto) {
    return this.resellersService.update(+id, updateResellerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resellersService.remove(+id);
  }
}
