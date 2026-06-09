import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEquipmentDto, UpdateEquipmentDto, WriteOffEquipmentDto } from './dto/equipment.dto';
import { Equipment, EquipmentMovement } from '@prisma/client';

@Injectable()
export class EquipmentService {
  constructor(private prisma: PrismaService) {}

  async getAllEquipments() {
    return this.prisma.equipment.findMany({
      orderBy: { id_equipment: 'asc' },
      include: {
        store: { select: { id_store: true, address: true } },
      },
    });
  }

  async getAllStores() {
    return this.prisma.stores.findMany({
      select: { id_store: true, address: true },
      orderBy: { id_store: 'asc' },
    });
  }

  
  async createEquipment(dto: CreateEquipmentDto,userId:number) {
    const storeExists = await this.prisma.stores.findUnique({
      where: { id_store: dto.storeId },
    });
    if (!storeExists) throw new BadRequestException('Магазин не существует');

    const quantity = dto.initialQuantity ?? 1;

    return this.prisma.$transaction(async (tx) => {
      const equipment = await tx.equipment.create({
        data: {
          name: dto.name,
          model: dto.model,
          inventory_number: dto.inventoryNumber,
          status: dto.status ?? 'Используется',
          store_id: dto.storeId,
          count: quantity,
        },
        include: { store: true },
      });

      await tx.equipmentMovement.create({
        data: {
          equipment_id: equipment.id_equipment,
          store_id: dto.storeId,
          quantity: quantity,
          operation_type: 'Поступление',
          comment: dto.comment || 'Начальное поступление оборудования',
          // created_by: dto.createdBy!,
          created_by: userId,
        },
      });

      return equipment;
    });
  }

  async updateEquipment(id: number, dto: UpdateEquipmentDto) {
    const equipment = await this.prisma.equipment.findUnique({
      where: { id_equipment: id },
    });
    if (!equipment) throw new NotFoundException(`Оборудование с ID ${id} не найдено`);

    if (dto.storeId) {
      const storeExists = await this.prisma.stores.findUnique({
        where: { id_store: dto.storeId },
      });
      if (!storeExists) throw new BadRequestException('Магазин не существует');
    }

    return this.prisma.equipment.update({
      where: { id_equipment: id },
      data: {
        name: dto.name,
        model: dto.model,
        inventory_number: dto.inventoryNumber,
        status: dto.status,
        store_id: dto.storeId,
      },
      include: { store: true },
    });
  }

  // Списание оборудования через регистр накопления
  // async writeOffEquipment(
  //   equipmentId: number,
  //   quantityToWriteOff: number,
  //   userId: number,
  //   comment?: string,
  // ) {
  //   if (quantityToWriteOff <= 0) {
  //     throw new BadRequestException('Количество на списание должно быть больше 0');
  //   }

  //   const equipment = await this.prisma.equipment.findUnique({
  //     where: { id_equipment: equipmentId },
  //   });

  //   if (!equipment) {
  //     throw new NotFoundException(`Оборудование с ID ${equipmentId} не найдено`);
  //   }

  //   return this.prisma.$transaction(async (tx) => {
  //     await tx.equipmentMovement.create({
  //       data: {
  //         equipment_id: equipmentId,
  //         store_id: equipment.store_id,
  //         quantity: -quantityToWriteOff,
  //         operation_type: 'Списание',
  //         comment: comment || `Списание ${quantityToWriteOff} шт.`,
  //         created_by: userId,
  //       },
  //     });

  //     await tx.equipment.update({
  //       where: { id_equipment: equipmentId },
  //       data: { status: 'Списано' },
  //     });

  //     return {
  //       success: true,
  //       message: `Списано ${quantityToWriteOff} ед. оборудования (ID ${equipmentId})`,
  //     };
  //   });
  // }
  

  async writeOffEquipment(
    equipmentId: number,
    quantity: number,
    userId: number,
    comment?: string,
  ): Promise<{ equipment: Equipment; movement: EquipmentMovement }> {
    
    if (quantity <= 0) {
      throw new BadRequestException('Количество списания должно быть больше 0');
    }

    // Получаем текущее оборудование
    const equipment = await this.prisma.equipment.findUnique({
      where: { id_equipment: equipmentId },
    });

    if (!equipment) {
      throw new NotFoundException('Оборудование не найдено');
    }

    if ((equipment.count || 0) < quantity) {
      throw new BadRequestException(
        `Недостаточно оборудования для списания. На складе: ${equipment.count}, запрошено: ${quantity}`,
      );
    }

    const newCount = (equipment.count || 0) - quantity;

    return await this.prisma.$transaction(async (tx) => {
      // 1. Создаём запись движения
      const movement = await tx.equipmentMovement.create({
        data: {
          equipment_id: equipmentId,
          store_id: equipment.store_id,
          quantity: -quantity,                    // важно: отрицательное значение
          operation_type: 'Списание',
          comment: comment || null,
          created_by: userId,
        },
      });

      // 2. Обновляем количество в Equipment
      const updatedEquipment = await tx.equipment.update({
        where: { id_equipment: equipmentId },
        data: {
          count: newCount,           // даже если 0 — оставляем запись
        },
      });

      return { equipment: updatedEquipment, movement };
    });
  }


  

    // Оборотная ведомость — все движения по всем магазинам и оборудованию
  async getAllMovements(
    storeId?: number,
    equipmentId?: number,
    startDate?: string,
    endDate?: string,
  ) {
    const where: any = {};

    if (storeId) {
      where.store_id = storeId;
    }
    if (equipmentId) {
      where.equipment_id = equipmentId;
    }
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) where.date.lte = new Date(endDate);
    }

    return this.prisma.equipmentMovement.findMany({
      where,
      orderBy: { date: 'desc' },
      include: {
        equipment: {
          select: {
            id_equipment: true,
            name: true,
            model: true,
            inventory_number: true,
          },
        },
        store: {
          select: {
            id_store: true,
            address: true,
          },
        },
        creator: {
          select: {
            id_users: true,
            firstName: true,
            lastName: true,
          },
        },
        inventoryItem: true,
      },
    });
  }

  // Текущий остаток из регистра
  async getCurrentCount(equipmentId: number): Promise<number> {
    const result = await this.prisma.equipmentMovement.aggregate({
      where: { equipment_id: equipmentId },
      _sum: { quantity: true },
    });
    return result._sum.quantity ?? 0;
  }

  // История движений по оборудованию
  async getEquipmentMovements(equipmentId: number) {
    return this.prisma.equipmentMovement.findMany({
      where: { equipment_id: equipmentId },
      orderBy: { date: 'desc' },
      include: {
        creator: {
          select: {
            id_users: true,
            firstName: true,
            lastName: true,
          },
        },
        inventoryItem: true,
      },
    });
  }
}









// import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';
// import { CreateEquipmentDto, UpdateEquipmentDto } from './dto/equipment.dto';

// @Injectable()
// export class EquipmentService {
//   constructor(private prisma: PrismaService) {}

//   // Получить всё оборудование с информацией о магазине
//   async getAllEquipments() {
//     return this.prisma.equipment.findMany({
//       orderBy: { id_equipment: 'asc' },
//       include: {
//         store: {
//           select: {
//             id_store: true,
//             address: true,
//           },
//         },
//       },
//     });
//   }

//   // Получить все магазины (для выпадающего списка при создании/редактировании)
//   async getAllStores() {
//     return this.prisma.stores.findMany({
//       select: {
//         id_store: true,
//         address: true,
//       },
//       orderBy: { id_store: 'asc' },
//     });
//   }

//   // Создание оборудования
//   async createEquipment(dto: CreateEquipmentDto) {
//     // Проверяем существование магазина
//     const storeExists = await this.prisma.stores.findUnique({
//       where: { id_store: dto.storeId },
//     });

//     if (!storeExists) {
//       throw new BadRequestException('Магазин с таким ID не существует');
//     }

//     return this.prisma.equipment.create({
//       data: {
//         name: dto.name,
//         model: dto.model,
//         inventory_number: dto.inventoryNumber,
//         status: dto.status,
//         store_id: dto.storeId,
//       },
//       include: {
//         store: {
//           select: { id_store: true, address: true },
//         },
//       },
//     });
//   }

//   // Обновление оборудования
//   async updateEquipment(id: number, dto: UpdateEquipmentDto) {
//     const equipment = await this.prisma.equipment.findUnique({
//       where: { id_equipment: id },
//     });

//     if (!equipment) {
//       throw new NotFoundException(`Оборудование с ID ${id} не найдено`);
//     }

//     // Если меняем магазин — проверяем его существование
//     if (dto.storeId) {
//       const storeExists = await this.prisma.stores.findUnique({
//         where: { id_store: dto.storeId },
//       });
//       if (!storeExists) {
//         throw new BadRequestException('Магазин с таким ID не существует');
//       }
//     }

//     return this.prisma.equipment.update({
//       where: { id_equipment: id },
//       data: {
//         name: dto.name,
//         model: dto.model,
//         inventory_number: dto.inventoryNumber,
//         status: dto.status,
//         store_id: dto.storeId,
//       },
//       include: {
//         store: {
//           select: { id_store: true, address: true },
//         },
//       },
//     });
//   }

//   // Удаление оборудования
//   async deleteEquipment(id: number) {
//     const equipment = await this.prisma.equipment.findUnique({
//       where: { id_equipment: id },
//     });

//     if (!equipment) {
//       throw new NotFoundException(`Оборудование с ID ${id} не найдено`);
//     }

//     await this.prisma.equipment.delete({
//       where: { id_equipment: id },
//     });

//     return { success: true, message: `Оборудование с ID ${id} удалено` };
//   }
// }