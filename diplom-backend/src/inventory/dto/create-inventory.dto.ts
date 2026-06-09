import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateInventoryDto {
  @IsInt({ message: 'storeId должен быть целым числом' })
  storeId!: number;

  @IsString()
  @IsOptional()
  comment?: string;
}

export class UpdateInventoryItemDto {
  @IsInt()
  countFact!: number;

  @IsString()
  @IsOptional()
  comment?: string;
}