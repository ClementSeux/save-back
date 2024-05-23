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
    try {
      return this.userCartRepository.save(createUserCartDto);
    } catch (error) {
      return error;
    }
  }

  findAll() {
    try {
      return this.userCartRepository.find();
    } catch (error) {
      return error;
    }
  }

  findOne(id: number) {
    try {
      return this.userCartRepository.findOne({ where: { id } });
    } catch (error) {
      return error;
    }
  }

  update(id: number, updateUserCartDto: UpdateUserCartDto) {
    try {
      return this.userCartRepository.update(id, updateUserCartDto);
    } catch (error) {
      return error;
    }
  }

  remove(id: number) {
    try {
      return this.userCartRepository.delete(id);
    } catch (error) {
      return error;
    }
  }
}
