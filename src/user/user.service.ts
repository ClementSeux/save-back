import {
  ConflictException,
  Delete,
  Get,
  Injectable,
  NotFoundException,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: User,
  })
  @Post()
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userRepository.save({
        ...createUserDto,
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
      let done = await this.userRepository.update(id, updateUserDto);
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
