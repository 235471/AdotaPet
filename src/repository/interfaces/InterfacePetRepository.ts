import { PetEntity } from '../../entities/PetEntity';
import { TipoRequestBodyPet, TipoResponseBodyPet } from '../../types/tiposPets';

export interface InterfacePetRepository {
  createPet(pet: TipoRequestBodyPet): Promise<TipoResponseBodyPet>;
  listPet(): Array<PetEntity> | Promise<TipoResponseBodyPet[]>;
  updatePet(id: number, pet: Partial<PetEntity>): Promise<void>;
  deletePet(id: number): Promise<void>;
  findPet(options: object): Promise<PetEntity | null>;
  listarPetAdocao(
    ids: Array<number>
  ): Promise<PetEntity[] | { pets: PetEntity[]; errors: string[] }>;
  filterByPorte(porte: PetEntity['porte']): Promise<Array<PetEntity> | Promise<PetEntity[]>>;
  filterBy(queryObject: object): Promise<TipoResponseBodyPet>;
}
