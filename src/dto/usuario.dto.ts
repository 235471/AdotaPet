/* eslint-disable indent */
import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { badRequest } from "../error/badRequest";

export class UsuarioDto {
  @Expose()
  @IsString()
  @IsNotEmpty({ message: "Nome é obrigatório" })
  nome!: string;

  @Expose()
  @IsString()
  @IsNotEmpty({ message: "Email é obrigatório" })
  email!: string;

  @Expose()
  @IsString()
  @IsOptional()
  celular?: string;

  @Exclude({ toPlainOnly: true })
  @IsString()
  @IsNotEmpty({ message: "Senha é obrigatória" })
  senha!: string;

  @Expose()
  @IsString()
  @IsOptional()
  id?: number;
}

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: "Nome é obrigatório" })
  nome!: string;

  @IsString()
  @IsNotEmpty({ message: "Email é obrigatório" })
  @IsEmail({}, { message: "Email inválido" })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: "Senha é obrigatória" })
  senha!: string;

  @IsString()
  @IsOptional()
  celular?: string;

  // Validação do celular
  validatePhone() {
    if (this.celular) {
      const phoneNumber = parsePhoneNumberFromString(this.celular, "BR");
      if (!phoneNumber || !phoneNumber.isValid()) {
        throw badRequest("Celular inválido. Verifique o formato e os números.");
      }
    }
  }
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

  // Validação do celular
  validatePhone() {
    if (this.celular) {
      const phoneNumber = parsePhoneNumberFromString(this.celular, "BR");
      if (!phoneNumber || !phoneNumber.isValid()) {
        throw new Error("Celular inválido. Verifique o formato e os números.");
      }
    }
  }
}
