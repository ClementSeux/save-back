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
import { Roles } from 'src/auth/security/roles.decorator';
import { Role } from 'src/user/enums/role.enums';
import { RolesGuard } from 'src/auth/security/roles.guard';
import { UseGuards } from '@nestjs/common';

@Controller('resellers')
export class ResellersController {
  constructor(private readonly resellersService: ResellerService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createResellerDto: CreateResellerDto) {
    return this.resellersService.create(createResellerDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.resellersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resellersService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
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

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resellersService.remove(+id);
  }
}
