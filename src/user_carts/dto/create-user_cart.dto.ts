import {
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateUserCartDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  cartId: number;

  @ApiPropertyOptional()
  customNotes: number[];

  @ApiPropertyOptional()
  excludedItems: number[];
}
