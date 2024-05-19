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

// @Entity()
// export class Step {
//   @ApiProperty()
//   @PrimaryGeneratedColumn()
//   id: number;

//   // Cart
//   @ApiProperty()
//   @ManyToOne(() => Cart, (cart) => cart.steps)
//   cart: Cart;

//   @ApiProperty()
//   @Column({ type: 'varchar', length: 120 })
//   title: string;

//   @ApiProperty()
//   @Column({ type: 'text' })
//   content: string;

//   @ApiProperty()
//   @Column({ type: 'varchar', length: 255 })
//   link: string;

//   @ApiProperty()
//   @Index()
//   @Column({ type: 'enum', enum: StepType })
//   type: StepType;

//   @ApiProperty()
//   @ManyToOne(() => Item, (item) => item.steps)
//   item: Item;

//   @ApiProperty()
//   @Column({ type: 'float' })
//   price: number;

//   @ApiProperty()
//   @Column({ type: 'float' })
//   oldPrice: number;
// }

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
