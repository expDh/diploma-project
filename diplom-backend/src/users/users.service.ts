
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { Position,Role } from '@prisma/client';
import { PrismaService } from '../prisma.service';

const SELF_UPDATABLE_FIELDS = ['firstName', 'lastName', 'patronymic', 'email', 'password'];


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  

  async updateSelf(userId: number, updateData: any) {
    const user = await this.prisma.users.findUnique({ where: { id_users: userId } });
    if (!user) throw new BadRequestException('Пользователь не найден');

    delete updateData.role;
    delete updateData.position;

    const updated = await this.prisma.users.update({
      where: { id_users: userId },
      data: updateData,
    });

    const { password, ...safeUser } = updated;
    return safeUser;
  }

  

  async getFreeResPersons() {
  return this.prisma.users.findMany({
    where: {
      position: 'RES_PERSON',
      userStores: {
        none: {}, 
      },
    },
  });
}

  async getAllResPerson(adminUserId: number) {
      
      const allRes = await this.prisma.users.findMany({
        where: { position: Position.RES_PERSON },
        include: {
          userStores: {
            select: { store: { select: { address: true } } },
          },
        },
        orderBy: { id_users: 'asc' },
      });
  
      return allRes.map((r) => ({
        id: r.id_users,
        email: r.email,
        phoneNumber: r.phoneNumber,
        firstName: r.firstName,
        lastName: r.lastName,
        patronymic: r.patronymic,
        role: r.role,
        position: r.position,
        address: r.userStores[0]?.store.address ?? null,
      }));
    }

  async updateAny(targetUserId: number, updateData: any) {
    const targetUser = await this.prisma.users.findUnique({
      where: { id_users: targetUserId },
    });
    if (!targetUser) throw new BadRequestException('Пользователь не найден');

    const updated = await this.prisma.users.update({
      where: { id_users: targetUserId },
      data: updateData,
    });

    const { password, ...safeUser } = updated;
    return safeUser;
  }

  async deleteUser(targetUserId: number) {
    await this.prisma.users.delete({
      where: { id_users: targetUserId },
    });

    return { 
      success: true, 
      message: `Пользователь с ID ${targetUserId} успешно удалён` 
    };
  }

  // async findOne(userId: number) {
  //   const user = await this.prisma.users.findUnique({ where: { id_users: userId } });
  //   if (!user) throw new BadRequestException('Пользователь не найден');

  //   const { password, ...safeUser } = user;
  //   return safeUser;
  // }
  async findOne(userId: number) {
  const user = await this.prisma.users.findUnique({
    where: { id_users: userId },
    include: {
      userStores: {
        include: {
          store: true
        }
      }
    }
  });

  if (!user) throw new BadRequestException('Пользователь не найден');

  const { password, ...safeUser } = user;
  return safeUser;
}

  async getAllUsersWithRelations() {
    return this.prisma.users.findMany({
      orderBy: { id_users: 'asc' },
      include: {
        userStores: {
          include: {
            store: {
              include: {
                equipments: true,
                inventories: {
                  include: {
                    inventoryItems: {
                      include: { equipment: true },
                    },
                  },
                },
              },
            },
          },
        },
        inventories: {
          include: {
            inventoryItems: {
              include: { equipment: true },
            },
          },
        },
      },
    });
  }
}












// // users.service.ts
// import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
// import { Role } from '@prisma/client';
// import { PrismaService } from '../prisma.service';

// const SELF_UPDATABLE_FIELDS = ['firstName', 'lastName', 'patronymic', 'email', 'password'];

// @Injectable()
// export class UsersService {
//   constructor(private prisma: PrismaService) {}

//   async updateSelf(userId: number, updateData: any) {
//     const user = await this.prisma.users.findUnique({ where: { id_users: userId } });
//     if (!user) throw new BadRequestException('Пользователь не найден');

//     // Очищаем опасные поля
//     delete updateData.role;
//     delete updateData.position;

//     const updated = await this.prisma.users.update({
//       where: { id_users: userId },
//       data: updateData,
//     });

//     const { password, ...safeUser } = updated;
//     return safeUser;
//   }

//   async updateAny(adminUserId: number, targetUserId: number, updateData: any) {
//     // Проверка админа уже сделана в AdminGuard → можно убрать отсюда
//     const targetUser = await this.prisma.users.findUnique({
//       where: { id_users: targetUserId },
//     });

//     if (!targetUser) throw new BadRequestException('Пользователь не найден');

//     const updated = await this.prisma.users.update({
//       where: { id_users: targetUserId },
//       data: updateData,
//     });

//     const { password, ...safeUser } = updated;
//     return safeUser;
//   }

//   async deleteUser(adminUserId: number, targetUserId: number) {
//     // Проверка уже в AdminGuard
//     await this.prisma.users.delete({ where: { id_users: targetUserId } });
//     return { success: true };
//   }

//   async findOne(userId: number) {
//     const user = await this.prisma.users.findUnique({ where: { id_users: userId } });
//     if (!user) throw new BadRequestException('Пользователь не найден');

//     const { password, ...safeUser } = user;
//     return safeUser;
//   }

//   async getAllUsersWithRelations(adminUserId: number) {
//     // Проверка уже в AdminGuard
//     return this.prisma.users.findMany({
//       orderBy: { id_users: 'asc' },
//       include: { /* ... твои include */ },
//     });
//   }
// }