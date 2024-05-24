import { Injectable } from '@nestjs/common';
import { CreateExclusionDto } from './dto/create-exclusion.dto';
import { UpdateExclusionDto } from './dto/update-exclusion.dto';

@Injectable()
export class ExclusionsService {
  create(createExclusionDto: CreateExclusionDto) {
    return 'This action adds a new exclusion';
  }

  findAll() {
    return `This action returns all exclusions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exclusion`;
  }

  update(id: number, updateExclusionDto: UpdateExclusionDto) {
    return `This action updates a #${id} exclusion`;
  }

  remove(id: number) {
    return `This action removes a #${id} exclusion`;
  }
}
