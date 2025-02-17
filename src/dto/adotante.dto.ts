/* eslint-disable indent */
import { IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { EnderecoDto } from './endereco.dto';
import { Type } from 'class-transformer';

export class CreateAdotanteDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome!: string;

  @IsString()
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  senha!: string;

  @IsString()
  @IsOptional()
  celular?: string;

  @IsObject()
  @ValidateNested()
  @Type(() => EnderecoDto)
  @IsOptional()
  endereco?: EnderecoDto;
}

export class UpdateAdotantetDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  senha?: string;

  @IsString()
  @IsOptional()
  celular?: string;

  @IsObject()
  @ValidateNested()
  @Type(() => EnderecoDto)
  endereco?: EnderecoDto;
}
