import { Especie } from '../enum/especie';
/* eslint-disable indent */
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsEnum,
  IsDate,
  IsNotEmpty,
  isString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Porte } from '../enum/porte';

export class CreatePetDto {
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome!: string;

  @IsEnum(Especie)
  @IsNotEmpty({ message: 'Espécie é obrigatória' })
  especie!: Especie;

  @IsEnum(Porte)
  @IsNotEmpty({ message: 'Espécie é obrigatória' })
  porte!: Porte;

  @IsDate()
  @IsNotEmpty({ message: 'Data de nascimento é obrigatória' })
  @Type(() => Date)
  dataNascimento!: Date;

  @IsBoolean()
  adotado = false;
}

export class UpdatePetDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsEnum(Especie)
  especie?: Especie;

  @IsOptional()
  @IsEnum(Porte)
  porte?: Porte;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dataNascimento?: Date;

  @IsOptional()
  @IsBoolean()
  adotado?: boolean;
}

export class QueryPetDto {
  @IsOptional()
  @IsEnum(Especie, {
    each: true, // Valida cada item do array
  })
  especie?: Especie | Especie[];

  @IsOptional()
  @IsEnum(Porte, {
    each: true, // Valida cada item do array
  })
  porte?: Porte | Porte[];

  @IsOptional()
  @IsString({ each: true })
  nome?: string | string[];

  @IsOptional()
  @IsString()
  adotado?: string;
}
