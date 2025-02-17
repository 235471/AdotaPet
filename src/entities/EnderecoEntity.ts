/* eslint-disable indent */
import { Entity, PrimaryGeneratedColumn, Column, } from 'typeorm';

@Entity('enderecos')
export class EnderecoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  constructor(cidade: string, estado: string) {
    this.cidade = cidade;
    this.estado = estado;
  }
}
