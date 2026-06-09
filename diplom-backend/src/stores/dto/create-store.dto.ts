import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsString({ message: 'Адрес должен быть строкой' })
  @IsNotEmpty({ message: 'Адрес магазина обязателен' })
  address!: string;
}