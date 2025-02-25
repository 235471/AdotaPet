/* eslint-disable indent */
import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { PetEntity } from "./PetEntity";
import { EnderecoEntity } from "./EnderecoEntity";
import { UsuarioEntity } from "./UsuarioEntity";

@Entity("adotantes")
export class AdotanteEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => UsuarioEntity, { cascade: true, eager: true })
  @JoinColumn()
  usuario: UsuarioEntity;

  @OneToOne(() => EnderecoEntity, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  endereco?: EnderecoEntity;

  @OneToMany(() => PetEntity, (pet) => pet.adotante, { cascade: true })
  pets: PetEntity[];

  constructor(usuario: UsuarioEntity, pets: PetEntity[], endereco?: EnderecoEntity) {
    this.usuario = usuario;
    this.endereco = endereco;
    this.pets = pets;
  }
}
