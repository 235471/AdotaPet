/* eslint-disable indent */
import { Exclude, Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class EnderecoDto {
  @IsString({ message: 'Cidade deve ser uma string' })
  @IsNotEmpty({ message: 'Cidade é obrigatória' })
  cidade!: string;

  @IsString({ message: 'Estado deve ser uma string' })
  @IsNotEmpty({ message: 'Estado é obrigatório' })
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
