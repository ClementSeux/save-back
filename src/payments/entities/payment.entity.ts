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

  //  timestamp automatiquement generated
  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  // @ManyToOne(() => Bill, (bill) => bill.payments, {
  //   cascade: ['remove'],
  //   onDelete: 'CASCADE',
  // })
  // bill: Bill;
}
