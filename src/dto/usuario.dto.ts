/* eslint-disable indent */
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from 'class-validator';
import { IsNotBlank } from '../decorators/IsNotBlank.decorator';
import { IsValidMobileNumber } from '../decorators/IsValidPhoneNumber.decorator';

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
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsNotBlank()
  nome!: string;

  @IsString({ message: 'Email deve ser uma string' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotBlank()
  email!: string;

  @IsString({ message: 'Senha deve ser uma string' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @IsNotBlank()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'A senha deve ter no mínimo 8 caracteres e conter 1 letra maiúscula, 1 número e 1 caractere especial (!@#$%^&*)',
    }
  )
  senha!: string;

  @IsString()
  @IsOptional()
  @IsValidMobileNumber()
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
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'A senha deve ter no mínimo 8 caracteres e conter 1 letra maiúscula, 1 número e 1 caractere especial (!@#$%^&*)',
    }
  )
  senha?: string;

  @IsString()
  @IsOptional()
  @IsValidMobileNumber()
  celular?: string;
}
