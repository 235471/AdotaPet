/* eslint-disable indent */
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from 'class-validator';
import { IsNotBlank } from '../decorators/IsNotBlank.decorator';
import { IsValidMobileNumber } from '../decorators/IsValidPhoneNumber.decorator';

export class CreateAbrigoDto {
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

export class UpdateAbrigoDto {
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
