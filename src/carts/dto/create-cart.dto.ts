import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly expertId: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly resellerId: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly availableFrom: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly availableTo: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly userId: number;
}
