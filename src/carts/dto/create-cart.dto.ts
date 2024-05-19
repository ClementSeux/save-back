import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

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
  readonly expertId: User;

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
