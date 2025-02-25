import { PetEntity } from '../entities/PetEntity';

type TipoRequestBodyPet = Omit<PetEntity, 'id'>;

type TipoRequestParamsPet = {
  id?: string;
  pet_id?: string;
  adotante_id?: string;
};

type TipoResponseBodyPet = {
  data?:
    | Pick<PetEntity, 'id' | 'nome' | 'porte' | 'especie'>
    | Pick<PetEntity, 'id' | 'nome' | 'porte' | 'especie'>[];
  error?: unknown;
};

export { TipoRequestBodyPet, TipoResponseBodyPet, TipoRequestParamsPet };
