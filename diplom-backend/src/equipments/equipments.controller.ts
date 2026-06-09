import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { EquipmentService } from './equipments.service';
import {
  CreateEquipmentDto,
  UpdateEquipmentDto,
  WriteOffEquipmentDto,
} from './dto/equipment.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { AdminOrManagerGuard } from '../guards/adminOrManager';


interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    id_users?: number;
    email: string;
    role: string;
  };
}

@Controller('equipments')
@UseGuards(JwtAuthGuard)
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Get()
  getAllEquipments() {
    return this.equipmentService.getAllEquipments();
  }

  @Get('stores')
  getAllStores() {
    return this.equipmentService.getAllStores();
  }

  @Post()
  @UseGuards(AdminOrManagerGuard)
  createEquipment(
    @Body() dto: CreateEquipmentDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id || req.user.id_users;

    if (!userId) {
      throw new Error('Не удалось определить текущего пользователя');
    }

    return this.equipmentService.createEquipment(dto, userId);
  }

  @Patch(':id')
  @UseGuards(AdminOrManagerGuard)
  updateEquipment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEquipmentDto,
  ) {
    return this.equipmentService.updateEquipment(id, dto);
  }

  
  @Delete(':id/writeoff')
@UseGuards(AdminOrManagerGuard)
async writeOffEquipment(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: WriteOffEquipmentDto,
  @Req() req: AuthenticatedRequest,
) {
  const userId = req.user?.id || req.user?.id_users;

  if (!userId) {
    throw new BadRequestException('Не удалось определить пользователя');
  }

  return this.equipmentService.writeOffEquipment(
    id,
    dto.quantity,
    userId,
    dto.comment,
  );
}




  
  @Get(':id/movements')
  @UseGuards(AdminOrManagerGuard)
  getEquipmentMovements(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentService.getEquipmentMovements(id);
  }

  
  @Get(':id/count')
  @UseGuards(AdminOrManagerGuard)
  getCurrentCount(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentService.getCurrentCount(id);
  }

  @Get('movements')
  @UseGuards(AdminOrManagerGuard)
  getAllMovements(
    @Query('storeId') storeId?: string,
    @Query('equipmentId') equipmentId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.equipmentService.getAllMovements(
      storeId ? parseInt(storeId) : undefined,
      equipmentId ? parseInt(equipmentId) : undefined,
      startDate,
      endDate,
    );
  }
}

// import {
//   Controller,
//   Get,
//   Post,
//   Patch,
//   Delete,
//   Body,
//   Param,
//   ParseIntPipe,
//   UseGuards,
//   Req,
// } from '@nestjs/common';

// import {
//   CreateEquipmentDto,
//   UpdateEquipmentDto,
//   WriteOffEquipmentDto,
// } from './dto/equipment.dto';
// import { JwtAuthGuard } from '../guards/jwt-auth.guard';
// import { AdminGuard } from '../guards/admin.guard';
// import { EquipmentService } from './equipments.service';

// @Controller('equipments')
// @UseGuards(JwtAuthGuard, AdminGuard)
// export class EquipmentController {
//   constructor(private readonly equipmentService: EquipmentService) {}

//   @Get()
//   getAllEquipments() {
//     return this.equipmentService.getAllEquipments();
//   }

//   @Get('stores')
//   getAllStores() {
//     return this.equipmentService.getAllStores();
//   }

//   @Post()
//   createEquipment(@Body() dto: CreateEquipmentDto) {
//     return this.equipmentService.createEquipment(dto);
//   }

//   @Patch(':id')
//   updateEquipment(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() dto: UpdateEquipmentDto,
//   ) {
//     return this.equipmentService.updateEquipment(id, dto);
//   }

//   @Delete(':id')
//   deleteEquipment(@Param('id', ParseIntPipe) id: number) {
//     return this.equipmentService.deleteEquipment(id);
//   }

// }
