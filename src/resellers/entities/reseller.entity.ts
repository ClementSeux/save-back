import { OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Cart } from '../../carts/entities/cart.entity';
import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

@Entity()
export class Reseller {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Unique(['rName'])
  @Column({ type: 'varchar', length: 40 })
  rName: string;

  @OneToMany(() => Cart, (cart) => cart.reseller)
  carts: Cart[];
}
