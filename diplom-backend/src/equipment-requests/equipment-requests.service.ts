import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';
import { Position, RequestStatus, RequestType } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EquipmentRequestsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateRequestDto) {
    const user = await this.prisma.users.findUnique({
      where: { id_users: userId },
      include: { userStores: true },
    });

    if (!user || user.position !== Position.RES_PERSON) {
      throw new ForbiddenException(
        'Только ответственные лица могут создавать заявки',
      );
    }

    const isAssigned = user.userStores.some(
      (us) => us.store_id === dto.storeId,
    );
    if (!isAssigned) {
      throw new ForbiddenException('Вы не прикреплены к этому магазину');
    }

    if (dto.type === RequestType.REPAIR) {
      if (!dto.equipmentId || !dto.quantity) {
        throw new BadRequestException(
          'Для ремонта обязательно оборудование и количество',
        );
      }

      const equipment = await this.prisma.equipment.findUnique({
        where: { id_equipment: dto.equipmentId },
      });
      if (!equipment || equipment.store_id !== dto.storeId) {
        throw new BadRequestException(
          'Оборудование не найдено в вашем магазине',
        );
      }
    } else if (dto.type === RequestType.PURCHASE) {
      if (!dto.comment?.trim()) {
        throw new BadRequestException('Для закупки обязателен комментарий');
      }
    }

    const newRequest = await this.prisma.equipmentRequest.create({
      data: {
        store_id: dto.storeId,
        created_by: userId, 
        type: dto.type,
        equipment_id: dto.equipmentId || null,
        quantity: dto.type === RequestType.REPAIR ? dto.quantity! : 1,
        comment: dto.comment || null,
      },
      include: {
        store: {
          select: { id_store: true, address: true },
        },
        creator: {
          select: {
            id_users: true,
            firstName: true,
            lastName: true,
            patronymic: true,
          },
        },
        equipment: {
          select: { id_equipment: true, name: true, model: true },
        },
        handler: {
          select: {
            id_users: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    console.log('Заявка создана:', {
      id: newRequest.id,
      created_by: newRequest.created_by,
      creator: newRequest.creator,
    });

    return newRequest;
  }

  //   async findAll(userId: number, role: string) {
  //     if (role === 'MANAGER' || role === 'ADMIN') {
  //       return this.prisma.equipmentRequest.findMany({
  //         orderBy: { created_at: 'desc' },
  //         include: {
  //           store: { select: { id_store: true, address: true } },
  //           creator: { select: { id_users: true, firstName: true, lastName: true } },
  //           equipment: { select: { id_equipment: true, name: true, model: true } },
  //         },
  //       });
  //     }

  //     return this.prisma.equipmentRequest.findMany({
  //       where: { created_by: userId },
  //       orderBy: { created_at: 'desc' },
  //       include: {
  //         store: { select: { id_store: true, address: true } },
  //         equipment: { select: { id_equipment: true, name: true, model: true } },
  //       },
  //     });
  //   }

  async findAll(userId: number, role: string) {
    console.log('🔍 findAll вызван. Role:', role, 'UserId:', userId);
    const include = {
      store: {
        select: { id_store: true, address: true },
      },
      creator: {
        select: {
          id_users: true,
          firstName: true,
          lastName: true,
          patronymic: true,
        },
      },
      handler: {
        select: {
          id_users: true,
          firstName: true,
          lastName: true,
        },
      },
      equipment: {
        select: {
          id_equipment: true,
          name: true,
          model: true,
        },
      },
    };

    if (role === 'ADMIN' || role === 'MANAGER') {
      return this.prisma.equipmentRequest.findMany({
        orderBy: { created_at: 'desc' },
        include,
      });
    }

    return this.prisma.equipmentRequest.findMany({
      where: { created_by: userId },
      orderBy: { created_at: 'desc' },
      include,
    });
  }

  async updateStatus(
    id: number,
    dto: UpdateRequestStatusDto,
    managerId: number,
  ) {
    const request = await this.prisma.equipmentRequest.findUnique({
      where: { id },
    });

    if (!request) {
      throw new NotFoundException('Заявка не найдена');
    }

    return this.prisma.equipmentRequest.update({
      where: { id },
      data: {
        status: dto.status,
        handled_by: managerId,
        comment: dto.comment || request.comment,
      },
    });
  }
}
