import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AdminOrManagerGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request['user'];

    if (!user?.id) return false;

    const dbUser = await this.prisma.users.findUnique({
      where: { id_users: user.id },
      select: { role: true },
    });

    // return dbUser?.role === Role.ADMIN || dbUser?.role === Role.MANAGER;
    if (!dbUser || (dbUser.role !== Role.ADMIN && dbUser.role !== Role.MANAGER)) {
  throw new ForbiddenException('Нет доступа');
}

return true;
  }
}