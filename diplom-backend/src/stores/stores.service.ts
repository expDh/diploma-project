import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  // async getAllStores() {
  //   return this.prisma.stores.findMany({
  //     orderBy: { id_store: 'asc' },
  //   });
  // }

  async updateStoreWithResponsible(
    storeId: number,
    dto: { address: string; responsibleId?: number },
  ) {
    console.log('=== updateStoreWithResponsible в сервисе ===');
    console.log('storeId:', storeId, 'тип:', typeof storeId);
    console.log('dto:', dto);

    if (storeId <= 0) {
      throw new Error(`Некорректный ID магазина: ${storeId}`);
    }

    await this.prisma.stores.update({
      where: { id_store: storeId },
      data: { address: dto.address },
    });

    await this.prisma.user_Stores.deleteMany({ where: { store_id: storeId } });

    if (dto.responsibleId != null) {
      const created = await this.prisma.user_Stores.create({
        data: { store_id: storeId, user_id: dto.responsibleId },
      });
      console.log('Создано user_Stores:', created);
    }

    return this.getAllStores(); // возвращаем список магазинов
  }

  // async getAllStores() {
  //   return this.prisma.stores.findMany({
  //     select: {
  //       id_store: true,
  //       address: true,
  //     },
  //     orderBy: { id_store: 'asc' },
  //   });
  // }

  async getAllStores() {
    return this.prisma.stores.findMany({
      orderBy: { id_store: 'asc' },
      select: {
        id_store: true,
        address: true,
        userStores: {
          include: {
            user: {
              select: {
                id_users: true,
                firstName: true,
                lastName: true,
                patronymic: true,
              },
            },
          },
        },
      },
    });
  }

  // async getAllStores() {
  //   return this.prisma.stores.findMany({
  //     orderBy: { id_store: 'asc' },
  //     include: {
  //       userStores: {
  //         include: {
  //           user: true,
  //         },
  //       },
  //     },
  //   });
  // }
  async createStore(dto: CreateStoreDto) {
    return this.prisma.stores.create({
      data: {
        address: dto.address,
      },
    });
  }

  async updateStore(storeId: number, dto: UpdateStoreDto) {
    return this.prisma.stores.update({
      where: { id_store: storeId },
      data: {
        address: dto.address,
      },
    });
  }

  async deleteStore(storeId: number) {
    await this.prisma.stores.delete({ where: { id_store: storeId } });
    return { success: true };
  }
}
