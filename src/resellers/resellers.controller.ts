import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResellerService } from './resellers.service';
import { CreateResellerDto } from './dto/create-reseller.dto';
import { UpdateResellerDto } from './dto/update-reseller.dto';
import { DeepPartial } from 'typeorm';
import { Reseller } from './entities/reseller.entity';

@Controller('resellers')
export class ResellersController {
  constructor(private readonly resellersService: ResellerService) {}

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
  update(
    @Param('id') id: string,
    @Body() updateResellerDto: UpdateResellerDto,
  ) {
    return this.resellersService.update(
      +id,
      updateResellerDto as DeepPartial<Reseller>,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resellersService.remove(+id);
  }
}
