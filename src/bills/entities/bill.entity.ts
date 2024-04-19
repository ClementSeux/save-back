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

@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bills)
  user: User;

  @OneToMany(() => Payment, (payment) => payment.bill)
  payments: Payment[];

  @ManyToMany(() => Product, (product) => product.bills)
  products: Product[];
}
