/* eslint-disable indent */
import { IsArray, IsInt, ArrayNotEmpty } from "class-validator";

export class adocaoPetsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true }) // Garante que cada item seja um número inteiro
  petIds!: number[];
}
