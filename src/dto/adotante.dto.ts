/* eslint-disable indent */
import { IsNotEmpty, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { EnderecoDto } from './endereco.dto';
import { Type } from 'class-transformer';
import { CreateUsuarioDto, UpdateUsuarioDto } from './usuario.dto';
import { Exclude, Expose } from 'class-transformer';
import { UsuarioDto } from './usuario.dto';
import { EnderecoDTOFormatted } from './endereco.dto';
import { PetEntity } from '../entities/PetEntity';

export class CreateAdotanteDto {
  @IsObject()
  @ValidateNested()
  @Type(() => CreateUsuarioDto)
  @IsNotEmpty({ message: 'Usuário é obrigatório' })
  usuario!: CreateUsuarioDto;

  @IsObject()
  @ValidateNested()
  @Type(() => EnderecoDto)
  @IsOptional()
  endereco?: EnderecoDto;
}

export class UpdateAdotantetDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateUsuarioDto)
  @IsOptional()
  usuario?: UpdateUsuarioDto;

  @IsObject()
  @ValidateNested()
  @Type(() => EnderecoDto)
  @IsOptional()
  endereco?: EnderecoDto;
}

export class AdotanteDTOFormatted {
  @Exclude({ toPlainOnly: true })
  id!: number;

  @Expose()
  @Type(() => UsuarioDto)
  usuario!: UsuarioDto;

  @Expose()
  @Type(() => EnderecoDTOFormatted)
  endereco?: EnderecoDTOFormatted;

  @Expose()
  @Type(() => PetEntity)
  pets!: PetEntity[];
}
