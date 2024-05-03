import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(40)
  readonly name: string;

  @ApiProperty()
  @IsDefined()
  @Min(0)
  readonly price: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly description: string;
}
