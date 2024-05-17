import {
  ConflictException,
  Delete,
  Get,
  Injectable,
  NotFoundException,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Bill } from 'src/bills/entities/bill.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  @ApiOperation({ summary: 'Create a payment' })
  @ApiCreatedResponse({
    description: 'The payment has been successfully created.',
    type: Payment,
  })
  @Post()
  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    try {
      return await this.paymentRepository.save({
        ...createPaymentDto,
      });
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @ApiOperation({ summary: 'Find all payments' })
  @ApiOkResponse({
    description: 'Return all payments.',
    type: Payment,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  findAllByBill(bill: Bill): Promise<Payment[]> {
    return this.paymentRepository.find({ where: { bill: bill } });
  }

  @ApiOperation({ summary: 'Find a payment by id' })
  @ApiOkResponse({
    description: 'Return the payment.',
    type: Payment,
  })
  @Get(':id')
  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOneBy({ id });
    if (!payment) {
      throw new NotFoundException(`Payment #${id} not found`);
    }
    return payment;
  }

  @ApiOperation({ summary: 'Update a payment' })
  @ApiNotFoundResponse({
    description: 'Payment not found.',
  })
  @ApiOkResponse({
    description: 'The payment has been successfully updated.',
    type: Payment,
  })
  @Patch(':id')
  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    try {
      let done = await this.paymentRepository.update(id, updatePaymentDto);
      if (done.affected != 1) {
        throw new NotFoundException(`Payment #${id} not found`);
      }
    } catch (e) {
      throw e instanceof NotFoundException
        ? e
        : new ConflictException(e.message);
    }
    return this.findOne(id);
  }

  @ApiOperation({ summary: 'Remove a payment' })
  @ApiNotFoundResponse({
    description: 'Payment not found.',
  })
  @ApiOkResponse({
    description: 'The payment has been successfully removed.',
  })
  @Delete(':id')
  async remove(id: number): Promise<void> {
    let done = await this.paymentRepository.delete(id);
    if (done.affected != 1) {
      throw new NotFoundException(`Payment #${id} not found`);
    }
  }
}
