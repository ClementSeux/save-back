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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => UserCart, (user_cart) => user_cart.customNotes)
  userCart: UserCart;
}
