/* eslint-disable indent */
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { AdotanteEntity } from './AdotanteEntity';
import { criarHashSenha } from '../utils/passwordHash';

@Entity('usuarios')
export class UsuarioEntity {
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

  @OneToOne(() => AdotanteEntity, (adotante) => adotante.usuario)
  adotante?: AdotanteEntity;

  @BeforeInsert()
  async hashSenha() {
    if (this.senha) this.senha = await criarHashSenha(this.senha)
    }

  constructor(nome: string, email: string, senha: string, celular?: string) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.celular = celular;
  }
}
