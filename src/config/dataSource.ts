import { DataSource } from 'typeorm';
import { PetEntity } from '../entities/PetEntity'; // Aqui você importa o seu modelo
import { AdotanteEntity } from '../entities/AdotanteEntity';
import { EnderecoEntity } from '../entities/EnderecoEntity';
import { UsuarioEntity } from '../entities/UsuarioEntity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './build/src/db/adota_pet.db', // Caminho para seu banco de dados existente
  synchronize: true, // Importante para não sobrescrever dados existentes
  logging: false,
  entities: [UsuarioEntity, PetEntity, AdotanteEntity, EnderecoEntity], // Suas entidades aqui
  migrations: [],
  subscribers: [],
});
