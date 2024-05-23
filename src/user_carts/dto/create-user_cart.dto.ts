import {
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Cart } from 'src/carts/entities/cart.entity';
import { CustomNote } from 'src/custom_notes/entities/custom_note.entity';
import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateUserCartDto {
  @ApiProperty()
  readonly userId: User;

  @ApiProperty()
  readonly cartId: Cart;

  @ApiPropertyOptional()
  readonly customNotes: CustomNote[];

  @ApiPropertyOptional()
  readonly excludedItems: Item[];
}
