import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Unique,
} from 'typeorm';
import { Bill } from 'src/bills/entities/bill.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 40 })
  @Unique(['pName'])
  pName: string;

  @ApiProperty()
  @Column({ type: 'text' })
  description: string;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price: number;

  @ManyToMany(() => Bill, (bill) => bill.products)
  @JoinTable()
  bills: Bill[];
}
