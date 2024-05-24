import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Step } from 'src/steps/entities/step.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Exclusion {
  @ApiProperty()
  @PrimaryColumn()
  userId: () => User;

  @ApiProperty()
  @PrimaryColumn()
  stepId: () => Step;

  @ManyToOne(() => User, (user) => user.exclusions)
  user: User;

  @ManyToOne(() => Step, (step) => step.exclusions)
  step: Step;
}
