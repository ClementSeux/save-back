import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  Min,
} from 'class-validator';
import { Role } from '../enums/role.enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(40)
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(120)
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  readonly role: Role;
}
