import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly cName: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly details: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly resellerId: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly availableFrom: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly availableTo: Date;
}
