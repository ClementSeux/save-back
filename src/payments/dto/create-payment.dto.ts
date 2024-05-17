import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  total: number;

  @ApiProperty()
  @IsDefined()
  bill: number;
}
