import { StepType } from '../enums/step-type.enum';
import { Item } from '../../items/entities/item.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Step {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 120 })
  title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  content: string;

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
}
