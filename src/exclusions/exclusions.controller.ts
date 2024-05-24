import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExclusionsService } from './exclusions.service';
import { CreateExclusionDto } from './dto/create-exclusion.dto';
import { use } from 'passport';

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

  @Get(':userId')
  findByUserId(@Param('userId') userId: string) {
    return this.exclusionsService.findByUserId(+userId);
  }

  @Delete(':userId/:stepId')
  remove(@Param('userId') userId: string, @Param('stepId') stepId: string) {
    return this.exclusionsService.remove(+userId, +stepId);
  }
}
