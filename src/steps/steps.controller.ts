import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StepsService } from './steps.service';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { Roles } from 'src/auth/security/roles.decorator';
import { Role } from 'src/user/enums/role.enums';
import { RolesGuard } from 'src/auth/security/roles.guard';
import { UseGuards } from '@nestjs/common';

@Controller('steps')
export class StepsController {
  constructor(private readonly stepsService: StepsService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EXPERT)
  @Post()
  create(@Body() createStepDto: CreateStepDto) {
    return this.stepsService.create(createStepDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.stepsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stepsService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EXPERT)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStepDto: UpdateStepDto) {
    return this.stepsService.update(+id, updateStepDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stepsService.remove(+id);
  }
}
