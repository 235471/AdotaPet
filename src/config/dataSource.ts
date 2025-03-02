import { DataSource } from 'typeorm';
import { PetEntity } from '../entities/PetEntity'; // Aqui você importa o seu modelo
import { AdotanteEntity } from '../entities/AdotanteEntity';
import { EnderecoEntity } from '../entities/EnderecoEntity';
import { UsuarioEntity } from '../entities/UsuarioEntity';
import { AbrigoEntity } from '../entities/AbrigoEntity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './build/adota_pet.db',
  synchronize: false,
  logging: false,
  entities: [UsuarioEntity, PetEntity, AdotanteEntity, EnderecoEntity, AbrigoEntity],
  migrations: ['./build/src/migrations/*.js'],
  migrationsTableName: 'migrations',
});
