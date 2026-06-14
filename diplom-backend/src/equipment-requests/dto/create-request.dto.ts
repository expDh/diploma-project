import { IsEnum, IsInt, Min, IsOptional, IsString, ValidateIf } from 'class-validator';
import { RequestType } from '@prisma/client';

export class CreateRequestDto {
  @IsInt()
  @Min(1)
  storeId!: number;

  @IsEnum(RequestType)
  type!: RequestType;

  @ValidateIf((o) => o.type === RequestType.REPAIR)
  @IsInt()
  @Min(1)
  equipmentId?: number;

  @ValidateIf((o) => o.type === RequestType.REPAIR)
  @IsInt()
  @Min(1)
  quantity?: number;

  @IsOptional()
  @IsString()
  comment?: string;
}