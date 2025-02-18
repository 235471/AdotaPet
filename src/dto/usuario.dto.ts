/* eslint-disable indent */
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UsuarioDto {
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome!: string;

  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email!: string;

  @Expose()
  @IsString()
  @IsOptional()
  celular?: string;

  @Exclude({ toPlainOnly: true })
  @IsString()
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  senha!: string;

  @Expose()
  @IsString()
  @IsOptional()
  id?: number;
}

export class CreateUsuarioDto {
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
}

export class UpdateUsuarioDto {
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
}
