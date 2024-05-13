import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IncomingMessage } from 'http';

@Injectable()
export class RolesGuard {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles || !roles.length) {
      return false;
    }
    // Extraction du JWT
    const request = context.switchToHttp().getRequest();
    //if (request instanceof IncomingMessage) {
    if (true) {
      const auth = request.headers.authorization;
      const args = auth && auth.split(' ');
      if (args && args.length > 1 && args[0] == 'Bearer') {
        const token = args[1];
        const jwts = new JwtService({ secret: process.env.JWT_SECRET });
        const payload = jwts.decode(token) as [key: string];
        const role = payload['role'];
        return roles.includes(role);
      }
    }

    return false;
  }
}
