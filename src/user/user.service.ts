import {
  ConflictException,
  Delete,
  Get,
  Injectable,
  Logger,
  NotFoundException,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Bill } from 'src/bills/entities/bill.entity';
import { BillService } from 'src/bills/bills.service';
import { Payment } from 'src/payments/entities/payment.entity';
import { PaymentService } from 'src/payments/payments.service';
import { Product } from 'src/products/entities/product.entity';
import { ProductService } from 'src/products/products.service';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import { Request } from 'express';
import { Headers } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Role } from './enums/role.enums';

type BillsData = {
  id: number;
  payments: Payment[];
  products: Product[];
};
type UserData = {
  id: number;
  uName: string;
  email: string;
  role: Role;
  bills: BillsData[];
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly billService: BillService,
    private readonly paymentService: PaymentService,
    private readonly productService: ProductService,
  ) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: User,
  })
  @Post()
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const salt = process.env.SALT || 10;
      const hash = await bcrypt.hash(createUserDto.password, salt);
      return await this.userRepository.save({
        ...createUserDto,
        password: hash,
        uName: createUserDto.name,
      });
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @ApiOperation({ summary: 'Find all users' })
  @ApiOkResponse({
    description: 'Return all users.',
    type: User,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  @ApiOperation({ summary: 'Find a user by id' })
  @ApiOkResponse({
    description: 'Return the user.',
    type: User,
  })
  @Get(':id')
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  @ApiOperation({ summary: 'Find the current user' })
  @ApiOkResponse({
    description: 'Return the user.',
    type: User,
  })
  async me(authHeader: string, logger: (msg) => void): Promise<UserData> {
    // retrieve user from token
    logger('authHeader: ' + authHeader);
    const token = authHeader.split(' ')[1];
    logger('token: ' + token);
    const payload = jwt.decode(token) as { id: number };
    logger('payload: ' + payload);
    const userData = await this.userRepository.findOneBy({
      id: payload.id,
    });
    if (!userData) {
      throw new NotFoundException(`User #${payload.id} not found`);
    }
    userData.bills = await this.billService.findAllByUser(userData);
    userData.bills.forEach(async (bill) => {
      bill.payments = await this.paymentService.findAllByBill(bill);
      bill.products = await this.productService.findAllByBill(bill);
    });

    return userData;
  }

  @ApiOperation({ summary: 'Find a user by email' })
  @ApiOkResponse({
    description: 'Return the user.',
    type: User,
  })
  @Get('email/:email')
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }
    return user;
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @ApiOkResponse({
    description: 'The user has been successfully updated.',
    type: User,
  })
  @Patch(':id')
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const editedDto = { ...updateUserDto, uName: updateUserDto.name };
      if (updateUserDto.password) {
        const salt = process.env.SALT || 10;
        const hash = await bcrypt.hash(updateUserDto.password, salt);
        editedDto.password = hash;
      }

      let done = await this.userRepository.update(id, editedDto);
      if (done.affected != 1) {
        throw new NotFoundException(`User #${id} not found`);
      }
    } catch (e) {
      throw e instanceof NotFoundException
        ? e
        : new ConflictException(e.message);
    }
    return this.findOne(id);
  }

  @ApiOperation({ summary: 'Remove a user' })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @ApiOkResponse({
    description: 'The user has been successfully removed.',
  })
  @Delete(':id')
  async remove(id: number): Promise<void> {
    let done = await this.userRepository.delete(id);
    if (done.affected != 1) {
      throw new NotFoundException(`User #${id} not found`);
    }
  }
}
