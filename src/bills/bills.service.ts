import {
  ConflictException,
  Delete,
  Get,
  Injectable,
  NotFoundException,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from './entities/bill.entity';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { PaymentService } from 'src/payments/payments.service';
import { Payment } from 'src/payments/entities/payment.entity';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill) private readonly billRepository: Repository<Bill>,
  ) {}

  @ApiOperation({ summary: 'Create a bill' })
  @ApiCreatedResponse({
    description: 'The bill has been successfully created.',
    type: Bill,
  })
  @Post()
  async create(createBillDto: DeepPartial<Bill>): Promise<Bill> {
    try {
      return await this.billRepository.save(createBillDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @ApiOperation({ summary: 'Find all bills' })
  @ApiOkResponse({
    description: 'Return all bills.',
    type: Bill,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<Bill[]> {
    return this.billRepository.find();
  }

  @ApiOperation({ summary: 'Find a bill by id' })
  @ApiOkResponse({
    description: 'Return the bill.',
    type: Bill,
  })
  @Get(':id')
  async findOne(id: number): Promise<Bill> {
    const bill = await this.billRepository.findOneBy({ id });
    if (!bill) {
      throw new NotFoundException(`Bill #${id} not found`);
    }
    return bill;
  }

  @ApiOperation({ summary: 'Update a bill' })
  @ApiNotFoundResponse({
    description: 'Bill not found.',
  })
  @ApiOkResponse({
    description: 'The bill has been successfully updated.',
    type: Bill,
  })
  @Patch(':id')
  async update(id: number, updateBillDto: UpdateBillDto) {
    try {
      let done = await this.billRepository.update(id, updateBillDto);
      if (done.affected != 1) {
        throw new NotFoundException(`Bill #${id} not found`);
      }
    } catch (e) {
      throw e instanceof NotFoundException
        ? e
        : new ConflictException(e.message);
    }
    return this.findOne(id);
  }

  @ApiOperation({ summary: 'Remove a bill' })
  @ApiNotFoundResponse({
    description: 'Bill not found.',
  })
  @ApiOkResponse({
    description: 'The bill has been successfully removed.',
  })
  @Delete(':id')
  async remove(id: number): Promise<void> {
    // delete associated payments first
    const paymentService = new PaymentService(
      this.billRepository.manager.getRepository(Payment),
    );
    let bill = await this.billRepository.find({
      where: { id },
      relations: ['payments'],
    });
    if (!bill) {
      throw new NotFoundException(`Bill #${id} not found`);
    }
    await Promise.all(
      bill[0].payments().map(async (payment) => {
        await paymentService.remove(payment.id);
      }),
    );

    let done = await this.billRepository.delete(id);
    if (done.affected != 1) {
      throw new NotFoundException(`Bill #${id} not found`);
    }
  }
}
