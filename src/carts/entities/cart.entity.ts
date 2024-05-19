import { Reseller } from 'src/resellers/entities/reseller.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserCart } from 'src/user_carts/entities/user_cart.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, isDate, IsNotEmpty } from 'class-validator';
import { Item } from 'src/items/entities/item.entity';
import { Step } from 'src/steps/entities/step.entity';

@Entity()
export class Cart {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @ManyToOne(() => User, (user) => user.createdCarts)
  expert: () => User;

  @ApiProperty()
  @IsNotEmpty()
  @ManyToOne(() => Reseller, (reseller) => reseller.carts)
  reseller: () => Reseller;

  @ApiProperty()
  @IsDate()
  @Column()
  availableFrom: Date;

  @ApiProperty()
  @IsDate()
  @Column()
  availableTo: Date;

  @ApiProperty()
  @OneToMany(() => Step, (step) => step.cart)
  steps: () => Step[];

  @OneToMany(() => UserCart, (user_cart) => user_cart.cart)
  userCarts: () => UserCart[];
}
