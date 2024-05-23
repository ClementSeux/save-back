import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Cart } from 'src/carts/entities/cart.entity';
import { ManyToOne, ManyToMany } from 'typeorm';
import { CustomNote } from 'src/custom_notes/entities/custom_note.entity';
import { Item } from 'src/items/entities/item.entity';

@Entity()
export class UserCart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userCarts)
  user: User;

  @ManyToOne(() => Cart, (cart) => cart.userCarts)
  cart: Cart;

  @OneToMany(() => CustomNote, (custom_note) => custom_note.userCart)
  customNotes: CustomNote[];

  @ManyToMany(() => Item, (item) => item.userCarts)
  @JoinTable()
  excludedItems: Item[];
}
