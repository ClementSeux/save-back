import { StepType } from '../enums/step-type.enum';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Cart } from 'src/carts/entities/cart.entity';
import { Item } from 'src/items/entities/item.entity';

export class CreateStepDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(120)
  readonly title: string;

  @ApiProperty()
  @IsDefined()
  readonly cart: Cart;

  @ApiProperty()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty()
  readonly link: string;

  @ApiProperty()
  @IsDefined()
  readonly type: StepType;

  @ApiProperty()
  @IsDefined()
  readonly item: Item;

  @ApiProperty()
  @IsNotEmpty()
  @Min(0)
  readonly price: number;

  @ApiProperty()
  @IsNotEmpty()
  @Min(0)
  readonly oldPrice: number;
}
