import {
  Column,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/role.enums';
import { Cart } from '../../carts/entities/cart.entity';
import { Bill } from 'src/bills/entities/bill.entity';
import { UserCart } from 'src/user_carts/entities/user_cart.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  @Column({ type: 'enum', enum: Role, default: Role.CUSTOMER })
  @Index()
  role: Role;

  @OneToMany(() => Cart, (cart) => cart.expert)
  createdCarts: Cart[];

  @OneToMany(() => UserCart, (u_cart) => u_cart.user)
  userCarts: UserCart[];

  @OneToMany(() => Bill, (bill) => bill.user)
  bills: Bill[];
}
