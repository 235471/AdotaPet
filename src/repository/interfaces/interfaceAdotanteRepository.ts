import { EnderecoEntity } from './../../entities/EnderecoEntity';
import { AdotanteEntity } from '../../entities/AdotanteEntity';
import { PetEntity } from '../../entities/PetEntity';
import { AdotanteDTOFormatted } from '../../dto/adotante.dto';
import { TipoResponseBodyAdotantes, TipoResponseBodyEndereco } from '../../types/tipoAdotante';
import { TipoResponseBodyPetAdotado } from '../../types/tiposPets';

export interface InterfaceAdotanteRepository {
  adotarPet(adotante: AdotanteEntity, pet: PetEntity[]): Promise<TipoResponseBodyPetAdotado>;
  listAdotanteSemSenha(): Promise<TipoResponseBodyAdotantes>;
  findById(id: number): Promise<AdotanteDTOFormatted>;
  deleteAdotante(id: number): Promise<void>;
  updateEndereco(id: number, endereco: EnderecoEntity): Promise<TipoResponseBodyEndereco>;
}
