import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExclusionsService } from './exclusions.service';
import { CreateExclusionDto } from './dto/create-exclusion.dto';
import { UpdateExclusionDto } from './dto/update-exclusion.dto';

@Controller('exclusions')
export class ExclusionsController {
  constructor(private readonly exclusionsService: ExclusionsService) {}

  @Post()
  create(@Body() createExclusionDto: CreateExclusionDto) {
    return this.exclusionsService.create(createExclusionDto);
  }

  @Get()
  findAll() {
    return this.exclusionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exclusionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExclusionDto: UpdateExclusionDto) {
    return this.exclusionsService.update(+id, updateExclusionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exclusionsService.remove(+id);
  }
}
