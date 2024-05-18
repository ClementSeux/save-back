import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BillService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { DeepPartial } from 'typeorm';
import { Bill } from './entities/bill.entity';
import { Logger } from '@nestjs/common';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillService) {}

  static logger = new Logger('BillController');

  @Post()
  create(@Body() createBillDto: CreateBillDto) {
    BillsController.logger.log(
      `Creating bill: ${JSON.stringify(createBillDto)}`,
    );
    return this.billsService.create(createBillDto as DeepPartial<Bill>);
  }

  @Get()
  findAll() {
    return this.billsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
    return this.billsService.update(+id, updateBillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billsService.remove(+id);
  }
}
