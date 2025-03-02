/* eslint-disable indent */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Especie } from '../enum/especie';
import { AdotanteEntity } from './AdotanteEntity';
import { Porte } from '../enum/porte';
import { AbrigoEntity } from './AbrigoEntity';

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

  @Column({
    type: 'text',
    enum: Porte,
    nullable: true,
  })
  porte?: Porte;

  @Column({ type: 'date' })
  dataNascimento: Date;

  @Column({ default: false })
  adotado: boolean;

  // Relação com o adotante (Muitos pets para um adotante)
  @ManyToOne(() => AdotanteEntity, (adotante) => adotante.pets)
  @JoinColumn({ name: 'adotanteId' }) // A chave estrangeira será 'adotanteId'
  adotante: AdotanteEntity;

  // Relação com o adotante (Muitos pets para um abrigo)
  @ManyToOne(() => AbrigoEntity, (abrigo) => abrigo.pets)
  @JoinColumn({ name: 'abrigoId' }) // A chave estrangeira será 'abrigoId'
  abrigo: AbrigoEntity | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date;

  constructor(
    nome: string,
    especie: Especie,
    dataNascimento: Date,
    adotado = false,
    adotante: AdotanteEntity,
    abrigo: AbrigoEntity,
    porte?: Porte
  ) {
    this.nome = nome;
    this.especie = especie;
    this.dataNascimento = dataNascimento;
    this.adotado = adotado;
    this.adotante = adotante;
    this.abrigo = abrigo;
    this.porte = porte;
  }
}
