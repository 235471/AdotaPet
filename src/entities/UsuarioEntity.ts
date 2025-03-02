/* eslint-disable indent */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { AdotanteEntity } from './AdotanteEntity';
import { criarHashSenha } from '../utils/passwordHash';
import { AbrigoEntity } from './AbrigoEntity';

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({ default: '', unique: true })
  celular?: string;

  @OneToOne(() => AdotanteEntity, (adotante) => adotante.usuario, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  adotante?: AdotanteEntity;

  @OneToOne(() => AbrigoEntity, (abrigo) => abrigo.usuario, { cascade: true, onDelete: 'CASCADE' })
  abrigo?: AbrigoEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date;

  @BeforeInsert()
  async hashSenha() {
    if (this.senha) this.senha = await criarHashSenha(this.senha);
  }

  constructor(nome: string, email: string, senha: string, celular?: string) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.celular = celular;
  }
}
