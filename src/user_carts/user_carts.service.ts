import { Injectable } from '@nestjs/common';
import { CreateUserCartDto } from './dto/create-user_cart.dto';
import { UpdateUserCartDto } from './dto/update-user_cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCart } from './entities/user_cart.entity';

@Injectable()
export class UserCartsService {
  constructor(
    @InjectRepository(UserCart)
    private readonly userCartRepository: Repository<UserCart>,
  ) {}

  create(createUserCartDto: CreateUserCartDto) {
    return 'This action adds a new userCart';
  }

  findAll() {
    return `This action returns all userCarts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userCart`;
  }

  update(id: number, updateUserCartDto: UpdateUserCartDto) {
    return `This action updates a #${id} userCart`;
  }

  remove(id: number) {
    return `This action removes a #${id} userCart`;
  }
}
