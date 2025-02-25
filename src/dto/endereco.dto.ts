/* eslint-disable indent */
import { Exclude, Expose } from "class-transformer";
import { IsString, IsNotEmpty } from "class-validator";

export class EnderecoDto {
  @IsString()
  @IsNotEmpty({ message: "Cidade é obrigatória" })
  cidade!: string;

  @IsString()
  @IsNotEmpty({ message: "Estado é obrigatório" })
  estado!: string;
}

export class EnderecoDTOFormatted {
  @Exclude({ toPlainOnly: true })
  id!: number;

  @Expose()
  cidade!: string;

  @Expose()
  estado!: string;
}
