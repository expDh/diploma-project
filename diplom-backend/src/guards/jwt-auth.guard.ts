import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly jwtSecret = process.env.JWT_SECRET || 'secret';

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.accessToken;

    if (!token) {
      throw new UnauthorizedException('Токен отсутствует');
    }

    try {
      const payload = jwt.verify(token, this.jwtSecret) as { id: number };
      request['user'] = payload;        // ← важно!
      return true;
    } catch (err) {
      throw new UnauthorizedException('Невалидный или просроченный токен');
    }
  }
}