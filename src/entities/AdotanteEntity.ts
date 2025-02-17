/* eslint-disable indent */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique, OneToOne, JoinColumn } from 'typeorm';
import { PetEntity } from './PetEntity';
import { EnderecoEntity } from './EnderecoEntity';

@Entity('adotantes')
export class AdotanteEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome: string;

  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  senha: string;

  @Column({ default: '' })
  celular?: string;

  @JoinColumn()
  @OneToOne(() => EnderecoEntity, { nullable: true, cascade: true, eager: true })
  endereco?: EnderecoEntity;

  // Relação de um adotante para muitos pets
  @OneToMany(() => PetEntity, (pet) => pet.adotante, { cascade: true })
  pets: PetEntity[];

  constructor(
    nome: string,
    email: string,
    senha: string,
    pets: PetEntity[],
    celular?: string,
    endereco?: EnderecoEntity
  ) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.celular = celular;
    this.endereco = endereco;
    this.pets = pets;
  }
}
