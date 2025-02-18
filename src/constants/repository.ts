import { Repository } from 'typeorm';
import { AppDataSource } from '../config/dataSource';
import { UsuarioEntity } from '../entities/UsuarioEntity';
import { EnderecoEntity } from '../entities/EnderecoEntity';
import { PetEntity } from '../entities/PetEntity';
import { AdotanteEntity } from '../entities/AdotanteEntity';

const adotanteRep: Repository<AdotanteEntity> = AppDataSource.getRepository('AdotanteEntity');
const petRep: Repository<PetEntity> = AppDataSource.getRepository('PetEntity');
const enderecoRep: Repository<EnderecoEntity> = AppDataSource.getRepository('EnderecoEntity');
const usuarioRep: Repository<UsuarioEntity> = AppDataSource.getRepository('UsuarioEntity');

export { adotanteRep, petRep, enderecoRep, usuarioRep };
