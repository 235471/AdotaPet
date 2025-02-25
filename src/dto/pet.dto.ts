import { Especie } from "../enum/especie";
/* eslint-disable indent */
import { IsString, IsBoolean, IsOptional, IsEnum, IsDate, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { Porte } from "../enum/porte";

export class CreatePetDto {
  @IsString()
  @IsNotEmpty({ message: "Nome é obrigatório" })
  nome!: string;

  @IsEnum(Especie)
  @IsNotEmpty({ message: "Espécie é obrigatória" })
  especie!: Especie;

  @IsEnum(Porte)
  @IsNotEmpty({ message: "Espécie é obrigatória" })
  porte!: Porte;

  @IsDate()
  @IsNotEmpty({ message: "Data de nascimento é obrigatória" })
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
