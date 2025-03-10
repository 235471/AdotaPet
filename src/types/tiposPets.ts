import { PetEntity } from '../entities/PetEntity';

type TipoRequestBodyPet = Omit<PetEntity, 'id'>;
type TipoRequestBodyPetArray = TipoRequestBodyPet[];

type TipoRequestParamsPet = {
  id?: string;
};

type TipoResponseBodyPet = {
  data?:
    | Pick<PetEntity, 'id' | 'nome' | 'porte' | 'especie' | 'dataNascimento' | 'adotado'>
    | Pick<PetEntity, 'id' | 'nome' | 'porte' | 'especie' | 'dataNascimento' | 'adotado'>[];
};

type TipoResponseBodyPetAdotado = Pick<
  PetEntity,
  'id' | 'nome' | 'porte' | 'especie' | 'dataNascimento' | 'adotado'
>[];

type TipoRequestQueryPets = {
  adotado?: string;
  nome?: string;
  especie?: string;
  porte?: string;
};

export {
  TipoRequestBodyPet,
  TipoResponseBodyPet,
  TipoRequestBodyPetArray,
  TipoRequestParamsPet,
  TipoRequestQueryPets,
  TipoResponseBodyPetAdotado,
};
