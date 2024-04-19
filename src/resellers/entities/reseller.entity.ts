import { OneToMany, PrimaryColumn } from 'typeorm';
import { Cart } from '../../carts/entities/cart.entity';
import { Entity } from 'typeorm';

@Entity()
export class Reseller {
  @PrimaryColumn({ type: 'varchar', length: 40 })
  rName: string;

  @OneToMany(() => Cart, (cart) => cart.reseller)
  carts: Cart[];
}
