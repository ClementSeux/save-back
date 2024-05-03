import { StepType } from '../enums/step-type.enum';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStepDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(120)
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty()
  @IsDefined()
  readonly type: StepType;

  @ApiProperty()
  @IsDefined()
  readonly itemId: number;
}
