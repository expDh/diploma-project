import { Module } from '@nestjs/common';
import { EquipmentRequestsService } from './equipment-requests.service';
import { EquipmentRequestsController } from './equipment-requests.controller';
// import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma.service';

@Module({
//   imports: [PrismaModule],
  controllers: [EquipmentRequestsController],
  providers: [EquipmentRequestsService,PrismaService],
  exports: [EquipmentRequestsService],
})
export class EquipmentRequestsModule {}