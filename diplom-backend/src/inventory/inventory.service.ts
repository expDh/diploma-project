import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateInventoryDto, UpdateInventoryItemDto } from './dto/create-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  
  async createInventory(dto: CreateInventoryDto, userId: number) {
  const storeExists = await this.prisma.stores.findUnique({
    where: { id_store: dto.storeId },
  });

  if (!storeExists) {
    throw new BadRequestException('Магазин не найден');
  }

  
  const equipments = await this.prisma.equipment.findMany({
    where: {
      store_id: dto.storeId,
    },
  });

  return this.prisma.$transaction(async (tx) => {

   
    const inventory = await tx.inventory.create({
      data: {
        store_id: dto.storeId,
        created_by: userId,
        comment: dto.comment,
        inventory_date: new Date(),
        status: 'В работе',
      },
    });

   
    for (const equipment of equipments) {
      await tx.inventory_Items.create({
        data: {
          inventory_id: inventory.id_inventory,
          equipment_id: equipment.id_equipment,
          count_system: equipment.count || 0,
          count_fact: null,
          status_fact: 'Не проверено',
        },
      });
    }

    
    return tx.inventory.findUnique({
      where: {
        id_inventory: inventory.id_inventory,
      },
      include: {
        store: true,
        inventoryItems: {
          include: {
            equipment: true,
          },
        },
      },
    });
  });
}

  
  async getAllInventories() {
    return this.prisma.inventory.findMany({
      include: {
        store: { select: { id_store: true, address: true } },
        creator: { select: { firstName: true, lastName: true } },
      },
      orderBy: { inventory_date: 'desc' },
    });
  }

  
  async getInventoryById(id: number) {
    const inventory = await this.prisma.inventory.findUnique({
      where: { id_inventory: id },
      include: {
        store: true,
        creator: { select: { firstName: true, lastName: true } },
        inventoryItems: {           
          include: {
            equipment: {
              select: {
                id_equipment: true,
                name: true,
                model: true,
                count: true,
                status: true,
              },
            },
          },
        },
      },
    });

    if (!inventory) throw new NotFoundException('Акт инвентаризации не найден');
    return inventory;
  }

 
  async updateInventoryItem(
    inventoryId: number,
    itemId: number,
    dto: UpdateInventoryItemDto,
  ) {
    const item = await this.prisma.inventory_Items.findFirst({
      where: { id: itemId, inventory_id: inventoryId },
    });

    if (!item) throw new BadRequestException('Строка акта не найдена');

    let statusFact: string | undefined = undefined;

    if (dto.countFact !== null && dto.countFact !== undefined) {
      const systemCount = item.count_system || 0;
      if (dto.countFact > systemCount) statusFact = 'Излишек';
      else if (dto.countFact < systemCount) statusFact = 'Недостача';
      else statusFact = 'Совпадает';
    }

    // return this.prisma.inventory_Items.update({
    //   where: { id: itemId },
    //   data: {
    //     count_fact: dto.countFact,
    //     comment: dto.comment,
    //     status_fact: statusFact,
    //   },
    // });
    return this.prisma.inventory_Items.update({
  where: { id: itemId },
  data: {
    count_fact: dto.countFact,
    comment: dto.comment,
    status_fact: statusFact,
  },

  include: {
    equipment: {
      select: {
        id_equipment: true,
        name: true,
        model: true,
        count: true,
        status: true,
      },
    },
  },
});
  }

  
  async finishInventory(inventoryId: number, userId: number) {
    return this.prisma.$transaction(async (tx) => {
      const items = await tx.inventory_Items.findMany({
        where: { inventory_id: inventoryId },
        include: { equipment: true },
      });

      for (const item of items) {
        if (item.count_fact === null) continue;

        const difference = item.count_fact - (item.equipment.count || 0);

        if (difference !== 0) {
          await tx.equipmentMovement.create({
            data: {
              equipment_id: item.equipment_id,
              store_id: item.equipment.store_id,
              quantity: difference,
              operation_type: 'Корректировка_инвентаризации',
              comment: `Корректировка по акту №${inventoryId}`,
              created_by: userId,
              inventory_item_id: item.id,
            },
          });

          await tx.equipment.update({
            where: { id_equipment: item.equipment_id },
            data: { count: item.count_fact },
          });
        }
      }

      await tx.inventory.update({
        where: { id_inventory: inventoryId },
        data: { status: 'Проведена' },
      });

      return { success: true, message: 'Инвентаризация успешно проведена' };
    });
  }
}