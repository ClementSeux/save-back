import { timeStamp } from 'console';
import { Bill } from 'src/bills/entities/bill.entity';
import { Entity, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm';
import { PaymentStatus } from '../enums/payment-status.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Payment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  total: number;

  @ApiProperty()
  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: string;

  @ApiProperty()
  @Column()
  timestamp: Date;

  @ManyToOne(() => Bill, (bill) => bill.payments)
  bill: Bill;
}
