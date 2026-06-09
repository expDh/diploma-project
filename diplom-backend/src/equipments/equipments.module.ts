import { Module } from '@nestjs/common';
import { EquipmentController } from './equipments.controller';
import { EquipmentService } from './equipments.service';
import { PrismaService } from '../prisma.service';


@Module({
  controllers: [EquipmentController],
  providers: [EquipmentService,PrismaService],
})
export class EquipmentsModule {}
