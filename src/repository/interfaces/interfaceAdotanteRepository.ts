import { EnderecoEntity } from './../../entities/EnderecoEntity';
import { AdotanteEntity } from '../../entities/AdotanteEntity';
import { PetEntity } from '../../entities/PetEntity';

export interface InterfaceAdotanteRepository {
  createAdotante(adotante: AdotanteEntity): void | Promise<void>;
  adotarPet(adotante: AdotanteEntity, pet: PetEntity[]): Promise<object>
  listAdotanteSemSenha(): Promise<AdotanteEntity[]>;
  findByEmail(email: string): Promise<AdotanteEntity>;
  findById(id: number): Promise<AdotanteEntity>;
  updateAdotante(id: number, adotante: Partial<AdotanteEntity>): Promise<void>;
  deleteAdotante(id: number): Promise<void>;
  updateEndereco(id: number, endereco: EnderecoEntity): Promise<AdotanteEntity>;
}
