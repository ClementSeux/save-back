import { StepType } from '../enums/step-type.enum';
import { Item } from '../../items/entities/item.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Cart } from 'src/carts/entities/cart.entity';
import { Exclusion } from 'src/exclusions/entities/exclusion.entity';

@Entity()
export class Step {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => Cart, (cart) => cart.steps)
  cart: () => Cart;

  @ApiProperty()
  @Column({ type: 'varchar', length: 120 })
  title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  content: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, default: '' })
  link: string;

  @ApiProperty()
  @Index()
  @Column({ type: 'enum', enum: StepType })
  type: StepType;

  @ApiProperty()
  @ManyToOne(() => Item, (item) => item.steps)
  item: Item;

  @ApiProperty()
  @Column({ type: 'float' })
  price: number;

  @ApiProperty()
  @Column({ type: 'float' })
  oldPrice: number;

  @ApiProperty()
  @OneToMany(() => Exclusion, (exclusion) => exclusion.step)
  exclusions: Exclusion[];
}
