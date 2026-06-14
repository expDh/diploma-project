import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { loginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';
import type { Response } from 'express';
import { Prisma, Role, Position } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  private readonly jwtSecret = process.env.JWT_SECRET || 'secret';
  private readonly accessExpires = process.env.ACCESS_TOKEN_EXPIRES || '30d';
  private readonly refreshExpires = process.env.REFRESH_TOKEN_EXPIRES || '365d';

  async register(
    dto: CreateAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const existingUser = await this.prisma.users.findUnique({
      where: { email: dto.email },
    });
    if (existingUser)
      throw new BadRequestException(
        'Пользователь с таким email уже существует',
      );

    const user = await this.prisma.users.create({
      data: {
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        password: dto.password,
        role: Role.USER,
        position: Position.EMPLOYEE,
        firstName: dto.firstName,
        lastName: dto.lastName,
        patronymic: dto.patronymic,
      },
    });

    const accessToken = jwt.sign({ id: user.id_users, role:user.role }, this.jwtSecret, {
      expiresIn: this.accessExpires,
    });
    const refreshToken = jwt.sign({ id: user.id_users, role:user.role }, this.jwtSecret, {
      expiresIn: this.refreshExpires,
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: this.calculateMs(this.accessExpires),
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: this.calculateMs(this.refreshExpires),
    });

    const { password, ...safeUser } = user;
    return {
      message: 'Регистрация прошла успешно!',
      accessToken,
      refreshToken,
      user: safeUser,
    };
  }

  async login(dto: loginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.prisma.users.findUnique({
      where: { email: dto.email },
    });
    if (!user || user.password !== dto.password) {
      throw new BadRequestException('Неверный логин или пароль');
    }

    const accessToken = jwt.sign({ id: user.id_users, role:user.role }, this.jwtSecret, {
      expiresIn: this.accessExpires,
    });
    const refreshToken = jwt.sign({ id: user.id_users, role:user.role }, this.jwtSecret, {
      expiresIn: this.refreshExpires,
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: this.calculateMs(this.accessExpires),
      // sameSite: 'lax',
      secure: true,
  sameSite: 'none',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: this.calculateMs(this.refreshExpires),
      // sameSite: 'lax',
      secure: true,
  sameSite: 'none',
    });

    const { password, ...safeUser } = user;
    return {
      message: 'Авторизация прошла успешно!',
      accessToken,
      refreshToken,
      user: safeUser,
    };
  }

  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return { message: 'Вы вышли из системы' };
  }

  refreshToken(
    @Res({ passthrough: true }) res: Response,
    refreshTokenCookie?: string,
  ) {
    if (!refreshTokenCookie)
      throw new BadRequestException('Нет refresh токена');

    try {
      const payload: any = jwt.verify(refreshTokenCookie, this.jwtSecret);

      const newAccessToken = jwt.sign({ id: payload.id, role: payload.role }, this.jwtSecret, {
        expiresIn: this.accessExpires,
      });
      const newRefreshToken = jwt.sign({ id: payload.id, role: payload.role }, this.jwtSecret, {
        expiresIn: this.refreshExpires,
      });

      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        maxAge: this.calculateMs(this.accessExpires),
        secure: true,
  sameSite: 'none',
      });
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        maxAge: this.calculateMs(this.refreshExpires),
        secure: true,
  sameSite: 'none',
      });

      return { message: 'Токены обновлены' };
    } catch (err) {
      throw new BadRequestException('Неверный или просроченный refresh токен');
    }
  }

  private calculateMs(exp: string): number {
    const num = parseInt(exp.slice(0, -1));
    const unit = exp.slice(-1);

    switch (unit) {
      case 's':
        return num * 1000;
      case 'm':
        return num * 60 * 1000;
      case 'h':
        return num * 60 * 60 * 1000;
      case 'd':
        return num * 24 * 60 * 60 * 1000;
      case 'y':
        return num * 365 * 24 * 60 * 60 * 1000;
      default:
        return 3 * 60 * 60 * 1000;
    }
  }
}
