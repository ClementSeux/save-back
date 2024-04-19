import { timeStamp } from 'console';
import { Bill } from 'src/bills/entities/bill.entity';
import { Entity, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm';
import { PaymentStatus } from '../enums/payment-status.enum';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: string;

  @Column()
  timestamp: Date;

  @ManyToOne(() => Bill, (bill) => bill.payments)
  bill: Bill;
}
