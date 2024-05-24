import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Step } from 'src/steps/entities/step.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Exclusion {
  @ApiProperty()
  @PrimaryColumn({ type: 'int', name: 'user' })
  @ManyToOne(() => User, (user) => user.exclusions)
  @JoinColumn({ name: 'user' })
  user: User;

  @ApiProperty()
  @PrimaryColumn({ type: 'int', name: 'step' })
  @ManyToOne(() => Step, (step) => step.exclusions)
  @JoinColumn({ name: 'step' })
  step: Step;
}
