import { EnderecoEntity } from './../../entities/EnderecoEntity';
import { AdotanteEntity } from '../../entities/AdotanteEntity';
import { PetEntity } from '../../entities/PetEntity';
import { AdotanteDTOFormatted } from '../../dto/adotante.dto';

export interface InterfaceAdotanteRepository {
  adotarPet(adotante: AdotanteEntity, pet: PetEntity[]): Promise<object>
  listAdotanteSemSenha(): Promise<AdotanteDTOFormatted[]>;
  findById(id: number): Promise<AdotanteDTOFormatted>;
  deleteAdotante(id: number): Promise<void>;
  updateEndereco(id: number, endereco: EnderecoEntity): Promise<AdotanteDTOFormatted>;
}
