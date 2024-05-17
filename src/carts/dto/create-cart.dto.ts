import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

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
  readonly user: () => User;
}
