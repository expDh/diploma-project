import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateEquipmentDto {
  @IsString()
  @IsNotEmpty({ message: 'Название оборудования обязательно' })
  name!: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsInt()
  @IsNotEmpty({ message: 'Магазин обязателен' })
  storeId!: number;

  @IsString()
  @IsOptional()
  status?: string = 'Используется';

  @IsInt()
  @IsOptional()
  inventoryNumber?: number;

  @IsInt()
  @IsOptional()
  initialQuantity?: number = 1;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsInt()
  @IsOptional()
  createdBy?: number;
}
export class WriteOffEquipmentDto {
  @IsInt()
  @IsNotEmpty()
  quantity!: number;

  @IsString()
  @IsOptional()
  comment?: string;
}

export class UpdateEquipmentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsInt()
  @IsOptional()
  storeId?: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsInt()
  @IsOptional()
  inventoryNumber?: number;
}

// DTO для ответа (опционально)
export class EquipmentResponseDto {
  id_equipment!: number;
  inventory_number?: number;
  name!: string;
  model?: string;
  status!: string;
  store!: {
    id_store: number;
    address: string;
  };
}
