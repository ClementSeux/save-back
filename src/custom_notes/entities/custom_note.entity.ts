import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max } from 'class-validator';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CustomNote {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'text' })
  @Max(40)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'text' })
  content: string;
}
