import { PetEntity } from "../../entities/PetEntity";

export interface InterfacePetRepository {
  createPet(pet: PetEntity): Promise<void>;
  listPet(): Array<PetEntity> | Promise<PetEntity[]>;
  updatePet(id: number, pet: Partial<PetEntity>): Promise<void>;
  deletePet(id: number): Promise<void>;
  findPet(options: object): Promise<PetEntity | null>;
  listarPetAdocao(
    ids: Array<number>,
  ): Promise<PetEntity[] | { pets: PetEntity[]; errors: string[] }>;
  filterByPorte(porte: PetEntity["porte"]): Promise<Array<PetEntity> | Promise<PetEntity[]>>;
  filterBy<T extends keyof PetEntity>(
    field: T,
    value: PetEntity[T],
  ): Promise<PetEntity[] | PetEntity[]>;
}
