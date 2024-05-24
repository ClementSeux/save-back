import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Step } from '../../steps/entities/step.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Item {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 120 })
  iName: string;

  @OneToMany(() => Step, (step) => step.item)
  steps: Step[];
}
