/* eslint-disable indent */
import { IsEnum } from "class-validator";
import { Porte } from "../enum/porte";

export class PorteDto {
  @IsEnum(Porte, { message: "Porte precisa ser válido" })
  porte!: Porte;
}
