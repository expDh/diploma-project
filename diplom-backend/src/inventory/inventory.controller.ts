import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  Req,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto, UpdateInventoryItemDto } from './dto/create-inventory.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminOrManagerGuard } from '../guards/adminOrManager';

@Controller('inventory')
@UseGuards(JwtAuthGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @UseGuards(AdminOrManagerGuard)
  async create(@Body() body: any, @Req() req: any) {
    const storeId = Number(body.storeId);

    if (!storeId || isNaN(storeId) || storeId <= 0) {
      throw new BadRequestException('storeId должен быть положительным целым числом');
    }

    const dto = {
      storeId: storeId,
      comment: body.comment as string | undefined,
    };

    return this.inventoryService.createInventory(dto, req.user.id);
  }

  @Get()
  getAll() {
    return this.inventoryService.getAllInventories();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryService.getInventoryById(id);
  }

  @Patch(':inventoryId/items/:itemId')
  updateItem(
    @Param('inventoryId', ParseIntPipe) inventoryId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() dto: UpdateInventoryItemDto,
  ) {
    return this.inventoryService.updateInventoryItem(inventoryId, itemId, dto);
  }

  @Post(':id/finish')
  @UseGuards(AdminOrManagerGuard)
  finish(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.inventoryService.finishInventory(id, req.user.id);
  }
}