import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';
import { Bill } from 'src/bills/entities/bill.entity';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  total: number;

  @ApiProperty()
  @IsDefined()
  bill: Bill;
}
