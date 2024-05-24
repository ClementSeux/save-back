import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Step } from 'src/steps/entities/step.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Exclusion {
  @ApiProperty()
  @PrimaryColumn({ type: 'int', name: 'user_id' })
  @ManyToOne(() => User, (user) => user.exclusions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty()
  @PrimaryColumn({ type: 'int', name: 'step_id' })
  @ManyToOne(() => Step, (step) => step.exclusions)
  @JoinColumn({ name: 'step_id' })
  step: Step;
}
