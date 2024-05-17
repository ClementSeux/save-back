import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/security/roles.decorator';
import { Role } from './enums/role.enums';
import { RolesGuard } from 'src/auth/security/roles.guard';
import { Logger } from '@nestjs/common';
import { Headers } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  static logger = new Logger('UserController');

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    Logger.log('post user received');

    return this.userService.create(createUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // who am i route. get by token
  // url: /user/me
  @Get('me')
  me(@Headers('authorization') authHeader: string) {
    return this.userService.me(authHeader, (msg) => Logger.log(msg));
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
