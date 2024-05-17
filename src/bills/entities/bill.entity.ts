import {
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { Product } from 'src/products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Bill {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.bills)
  user: () => User;

  @OneToMany(() => Payment, (payment) => payment.bill)
  payments: Payment[];

  @ManyToMany(() => Product, (product) => product.bills)
  products: Product[];
}
