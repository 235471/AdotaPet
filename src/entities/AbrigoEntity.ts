/* eslint-disable indent */
import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { PetEntity } from './PetEntity';
import { EnderecoEntity } from './EnderecoEntity';
import { UsuarioEntity } from './UsuarioEntity';

@Entity('abrigos')
export class AbrigoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => UsuarioEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuarioId' })
  usuario: UsuarioEntity;

  @OneToOne(() => EnderecoEntity, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  endereco?: EnderecoEntity;

  @OneToMany(() => PetEntity, (pet) => pet.abrigo, { cascade: true })
  pets: PetEntity[];

  constructor(usuario: UsuarioEntity, pets: PetEntity[], endereco?: EnderecoEntity) {
    this.usuario = usuario;
    this.endereco = endereco;
    this.pets = pets;
  }
}
