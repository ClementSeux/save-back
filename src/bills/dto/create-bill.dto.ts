import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBillDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty()
  @IsDefined()
  readonly products: number[];
}
