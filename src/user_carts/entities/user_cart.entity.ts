import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Cart } from 'src/carts/entities/cart.entity';
import { ManyToOne } from 'typeorm';
import { CustomNote } from 'src/custom_notes/entities/custom_note.entity';

@Entity()
export class UserCart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userCarts)
  user: User;

  @ManyToOne(() => Cart, (cart) => cart.userCarts)
  cart: number;

  @OneToMany(() => CustomNote, (custom_note) => custom_note.userCart)
  customNotes: CustomNote[];
}
