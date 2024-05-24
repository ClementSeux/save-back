import { PartialType } from '@nestjs/swagger';
import { CreateExclusionDto } from './create-exclusion.dto';

export class UpdateExclusionDto extends PartialType(CreateExclusionDto) {}
