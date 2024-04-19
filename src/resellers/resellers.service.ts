import { Injectable } from '@nestjs/common';
import { CreateResellerDto } from './dto/create-reseller.dto';
import { UpdateResellerDto } from './dto/update-reseller.dto';

@Injectable()
export class ResellersService {
  create(createResellerDto: CreateResellerDto) {
    return 'This action adds a new reseller';
  }

  findAll() {
    return `This action returns all resellers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reseller`;
  }

  update(id: number, updateResellerDto: UpdateResellerDto) {
    return `This action updates a #${id} reseller`;
  }

  remove(id: number) {
    return `This action removes a #${id} reseller`;
  }
}
