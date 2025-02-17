import { Especie } from '../enum/especie';
/* eslint-disable indent */
import { IsString, IsBoolean, IsOptional, IsEnum, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome!: string;

  @IsEnum(Especie)
  @IsNotEmpty({ message: 'Espécie é obrigatória' })
  especie!: Especie;

  @IsDate()
  @IsNotEmpty({ message: 'Data de nascimento é obrigatória' })
  @Type(() => Date) 
  dataNascimento!: Date;

  @IsBoolean()
  adotado!: boolean;
}

export class UpdatePetDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsEnum(Especie)
  especie?: Especie;

  @IsOptional()
  @IsDate()
  @Type(() => Date) 
  dataNascimento?: Date;

  @IsOptional()
  @IsBoolean()
  adotado?: boolean;
}
