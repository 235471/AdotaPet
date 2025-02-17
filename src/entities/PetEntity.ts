/* eslint-disable indent */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Especie } from '../enum/especie';
import { AdotanteEntity } from './AdotanteEntity';

@Entity('pets')
export class PetEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome: string;

  @Column({
    type: 'text',
    enum: Especie,
  })
  especie: Especie;

  @Column({ type: 'date' })
  dataNascimento: Date;

  @Column({ default: false })
  adotado: boolean;

  // Relação com o adotante (Muitos pets para um adotante)
  @ManyToOne(() => AdotanteEntity, (adotante) => adotante.pets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'adotanteId' }) // A chave estrangeira será 'adotanteId'
  adotante: AdotanteEntity;

  constructor(nome: string, especie: Especie, dataNascimento: Date, adotado = false, adotante: AdotanteEntity) {
    this.nome = nome;
    this.especie = especie;
    this.dataNascimento = dataNascimento;
    this.adotado = adotado;
    this.adotante = adotante;
  }
}
