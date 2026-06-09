import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateStoreDto {
  @IsOptional()
  @IsString({ message: 'Адрес должен быть строкой' })
  @IsNotEmpty({ message: 'Адрес магазина обязателен' })
  address?: string;

  @IsOptional()
  responsibleId?: number; 
}