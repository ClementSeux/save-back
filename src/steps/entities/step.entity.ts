import { StepType } from '../enums/step-type.enum';
import { Item } from '../../items/entities/item.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Index()
  @Column({ type: 'enum', enum: StepType })
  type: StepType;

  @ManyToOne(() => Item, (item) => item.steps)
  item: Item;
}
