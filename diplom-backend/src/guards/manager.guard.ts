import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ManagerGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request['user'];

    if (!user?.id) {
      throw new ForbiddenException('Пользователь не авторизован');
    }

    const dbUser = await this.prisma.users.findUnique({
      where: { id_users: user.id },
      select: { role: true },
    });

    if (!dbUser || dbUser.role !== Role.MANAGER) {
      throw new ForbiddenException('Доступ разрешен только менеджерам!');
    }

    return true;
  }
}