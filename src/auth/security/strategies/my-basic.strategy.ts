import * as bcrypt from 'bcryptjs';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy } from 'passport-http';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MyBasicStrategy extends PassportStrategy(BasicStrategy) {
  constructor(private users: UserService) {
    super();
  }

  async validate(login: string, password: string): Promise<any> {
    const user = await this.users.findOneByEmail(login);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException();
  }
}