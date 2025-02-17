import { PetEntity } from '../../entities/PetEntity';

export interface InterfacePetRepository {
  createPet(pet: PetEntity): Promise<void>;
  listPet(): Array<PetEntity> | Promise<PetEntity[]>;
  updatePet(id: number, pet: Partial<PetEntity>): Promise<void>;
  deletePet(id: number): Promise<void>;
  findPet(options: object): Promise<PetEntity | null>;
  listarPetAdocao(ids:  Array<number>): Promise<PetEntity[] | { pets: PetEntity[], errors: string[] }>;
}
