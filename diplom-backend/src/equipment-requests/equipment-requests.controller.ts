import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { EquipmentRequestsService } from './equipment-requests.service';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminOrManagerGuard } from '../guards/adminOrManager';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';
import { ManagerGuard } from '../guards/manager.guard';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    id_users?: number;
    email: string;
    role: string;
  };
}

@Controller('equipment-requests')
@UseGuards(JwtAuthGuard)
export class EquipmentRequestsController {
  constructor(private readonly requestsService: EquipmentRequestsService) {}

  @Post()
  createRequest(
    @Body() dto: CreateRequestDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id || req.user.id_users;

    if (!userId) {
      throw new BadRequestException('Не удалось определить пользователя');
    }

    return this.requestsService.create(userId, dto);
  }
//   @UseGuards(ManagerGuard)
//   @Get()
//   @UseGuards(JwtAuthGuard)
//   getAllRequests(@Req() req: AuthenticatedRequest) {
//     const user = req.user;
//     const userId = user.id || user.id_users;
//     const role = user.role;
//     console.log('Пользователь из токена:', { 
//     userId, 
//     role: role, 
//     fullUser: user 
//   });
//     if (!userId) {
//       throw new BadRequestException('Не удалось определить пользователя');
//     }

//     // return this.requestsService.findAll(userId, user.role);
//     return this.requestsService.findAll(userId, role || 'USER');
//   }
@Get()
getAllRequests(@Req() req: AuthenticatedRequest) {
  console.log('USER:', req.user);

  return this.requestsService.findAll(req.user.id, req.user.role);
}

  @Patch(':id/status')
  @UseGuards(AdminOrManagerGuard)
  updateRequestStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRequestStatusDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id || req.user.id_users;

    if (!userId) {
      throw new BadRequestException('Не удалось определить пользователя');
    }

    return this.requestsService.updateStatus(id, dto, userId);
  }
}