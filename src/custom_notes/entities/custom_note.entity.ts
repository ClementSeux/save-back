import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max } from 'class-validator';
import { UserCart } from 'src/user_carts/entities/user_cart.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CustomNote {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'text' })
  @Max(40)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => UserCart, (user_cart) => user_cart.customNotes)
  userCart: UserCart;
}
