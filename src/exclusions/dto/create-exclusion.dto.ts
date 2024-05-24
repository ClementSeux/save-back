import { IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { Step } from 'src/steps/entities/step.entity';

export class CreateExclusionDto {
  @ApiProperty()
  @IsDefined()
  readonly userId: User;

  @ApiProperty()
  @IsDefined()
  readonly stepId: Step;
}
