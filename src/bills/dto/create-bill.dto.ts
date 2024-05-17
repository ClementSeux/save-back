import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateBillDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly user: User;

  @ApiProperty()
  @IsDefined()
  readonly products: Product[];
}
