import { Injectable, Post } from '@nestjs/common';
import { CreateExclusionDto } from './dto/create-exclusion.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Exclusion } from './entities/exclusion.entity';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Get } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ExclusionsService {
  constructor(
    @InjectRepository(Exclusion)
    private readonly exclusionRepository: Repository<Exclusion>,
  ) {}

  @ApiOperation({ summary: 'Create an exclusion' })
  @ApiOkResponse({
    description: 'The exclusion has been successfully created.',
    type: Exclusion,
  })
  @Post()
  create(createExclusionDto: CreateExclusionDto) {
    try {
      return this.exclusionRepository.save({
        ...createExclusionDto,
      });
    } catch (e) {
      console.log(e);
    }
  }

  @ApiOperation({ summary: 'Find all exclusions' })
  @ApiOkResponse({
    description: 'All exclusions have been successfully found.',
    type: Exclusion,
    isArray: true,
  })
  @Get()
  findAll() {
    try {
      return this.exclusionRepository.find();
    } catch (e) {
      console.log(e);
    }
  }

  @ApiOperation({ summary: 'Find exclusions by user id' })
  @ApiOkResponse({
    description: 'All exclusions have been successfully found.',
    type: Exclusion,
    isArray: true,
  })
  async findByUserId(user: number) {
    try {
      const userExclusionList = this.exclusionRepository
        .createQueryBuilder('exclusion')
        .where('exclusion.user = :user', { user: user })
        .getMany();

      const userData = await userExclusionList;

      if (!userData) {
        throw new NotFoundException(`User #${user} not found`);
      }
      return userData;
    } catch (e) {
      console.log(e);
    }
  }

  @ApiOperation({ summary: 'Remove an exclusion' })
  @ApiOkResponse({
    description: 'The exclusion has been successfully removed.',
  })
  @ApiNotFoundResponse({
    description: 'The exclusion was not found.',
  })
  remove(user: number, step: number) {
    try {
      const userExclusionList =
        this.exclusionRepository.createQueryBuilder('exclusion');
      userExclusionList
        .delete()
        .from(Exclusion)
        .where('user = :user', { user: user })
        .andWhere('step = :step', { step: step })
        .execute();
    } catch (e) {
      console.log(e);
    }
  }
}
