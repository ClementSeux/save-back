import { Reseller } from 'src/resellers/entities/reseller.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ManyToOne, JoinColumn } from 'typeorm';
import { UserCart } from 'src/user_carts/entities/user_cart.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.createdCarts)
  expert: User;

  @ManyToOne(() => Reseller, (reseller) => reseller.carts)
  reseller: Reseller;

  @Column()
  availableFrom: Date;

  @Column()
  availableTo: Date;

  @OneToMany(() => UserCart, (user_cart) => user_cart.cart)
  userCarts: UserCart[];
}
