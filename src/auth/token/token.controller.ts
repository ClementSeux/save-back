import {
  Controller,
  Get,
  Headers,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../../user/entities/user.entity';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { hashPassword } from 'src/utils/hashing';

@Controller('auth/token')
export class TokenController {
  constructor(
    private readonly users: UserService,
    private jwts: JwtService,
  ) {}

  @ApiOperation({
    summary: 'Sign in',
    description: 'Sign in with email and password',
  })
  @ApiUnauthorizedResponse({ description: 'Authentication failed' })
  @ApiOkResponse({ description: 'Authentication successful', type: SignInDto })
  @Get()
  @UseGuards(AuthGuard('basic'))
  async signIn(@Headers('Authorization') auth: string): Promise<SignInDto> {
    const base64String = auth.split(' ')[1];
    const decodedString = Buffer.from(base64String, 'base64').toString('utf-8');
    const email = decodedString.split(':')[0];
    const password = decodedString.split(':')[1];
    let user: User;
    try {
      user = await this.users.findOneByEmail(email);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
    const hashedPassword = await hashPassword(password);
    const result = hashedPassword === user.password;
    if (result) {
      const cr = new SignInDto();
      const options: JwtSignOptions = {
        secret: process.env.JWT_SECRET,
        subject: email,
        expiresIn: '1h',
        algorithm: 'HS256',
      };
      cr.expires_in = 3600;
      cr.access_token = this.jwts.sign(
        { id: user.id, role: user.role },
        options,
      );
      return cr;
    } else {
      throw new UnauthorizedException();
    }
  }
}
