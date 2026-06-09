import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { AdminOrManagerGuard } from '../guards/adminOrManager';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @UseGuards(JwtAuthGuard, AdminOrManagerGuard)
@Patch('updateStoreWithResponsible/:id')
updateStoreWithResponsible(
  @Param('id', ParseIntPipe) id: number,
  @Body() body: { address: string; responsibleId?: number },
) {
  console.log('=== Получен запрос updateStoreWithResponsible ===');
  console.log('ID из URL:', id);
  console.log('Тело запроса:', body);
  console.log('Тип ID:', typeof id);

  if (id <= 0) {
    console.error('КРИТИЧЕСКАЯ ОШИБКА: Получен некорректный ID =', id);
  }

  return this.storesService.updateStoreWithResponsible(id, body);
}

  @UseGuards(JwtAuthGuard, AdminOrManagerGuard)// Рекомендую добавлять JwtAuthGuard тоже
  @Get('getAllStores')
  getAllStores() {
    return this.storesService.getAllStores();
  }

  @UseGuards(JwtAuthGuard, AdminOrManagerGuard)
  @Post('createStore')
  createStore(@Body() dto: CreateStoreDto) {
    return this.storesService.createStore(dto);
  }

  @UseGuards(JwtAuthGuard, AdminOrManagerGuard)

  @Patch('updateStore/:id')
  updateStore(
    @Param('id', ParseIntPipe) id: number, 
    @Body() dto: UpdateStoreDto,
  ) {
    return this.storesService.updateStore(id, dto);
  }
  @Delete('deleteStore/:id')
  deleteStore(@Param('id', ParseIntPipe) id: number) {
    return this.storesService.deleteStore(id);
  }
}
