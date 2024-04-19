import { Bill } from 'src/bills/entities/bill.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 40 })
  pName: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price: number;

  @ManyToMany(() => Bill, (bill) => bill.products)
  @JoinTable()
  bills: Bill[];
}
