import {
  Column,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
// import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/role.enums';
import { Cart } from '../../carts/entities/cart.entity';
import { Bill } from 'src/bills/entities/bill.entity';
import { UserCart } from 'src/user_carts/entities/user_cart.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 40 })
  uName: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 120 })
  @Unique(['email'])
  email: string;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: Role, default: Role.CUSTOMER })
  @Index()
  role: Role;

  @ApiProperty()
  @OneToMany(() => Cart, (cart) => cart.expert)
  createdCarts: Cart[];

  @ApiProperty()
  @OneToMany(() => UserCart, (u_cart) => u_cart.user)
  userCarts: UserCart[];

  @ApiProperty()
  @OneToMany(() => Bill, (bill) => bill.user)
  bills: Bill[];
}
