import { Router } from 'express';
import { validateDto } from '../middleware/validationMiddleware';
import { AbrigoController } from '../controller/AbrigoController';
import { abrigoRep, adotanteRep, petRep } from '../constants/repository';
import { AbrigoRepository } from '../repository/AbrigoRepository';
import { authentication } from '../middleware/authentication';
import { CreatePetDto } from '../dto/pet.dto';
import { PetController } from '../controller/PetController';
import { PetRepository } from '../repository/PetRepository';
import { IPetController } from '../interface/PetController';
import { EnderecoDto } from '../dto/endereco.dto';
import { AdotanteController } from '../controller/AdotanteController';
import { AdotanteRepository } from '../repository/AdotanteRepository';
import { verificaIdMiddleware } from '../middleware/validateParams';

const abrigoRepository = new AbrigoRepository(abrigoRep);
const abrigoController = new AbrigoController(abrigoRepository);

const petRepository = new PetRepository(petRep);
const petController: IPetController = new PetController(petRepository, abrigoRepository);

const adotanteRepository = new AdotanteRepository(adotanteRep);
const adotanteController = new AdotanteController(adotanteRepository, petRepository);

const router = Router();

router.get('/', abrigoController.listAbrigo.bind(abrigoController));

router.patch(
  '/:id',
  authentication,
  verificaIdMiddleware,
  validateDto(EnderecoDto, { isUpdate: true }),
  abrigoController.updateAbrigoEndereco.bind(abrigoController)
);

router.post(
  '/:id/pets',
  authentication,
  verificaIdMiddleware,
  validateDto(CreatePetDto, { isArray: true }),
  petController.createPets.bind(petController)
);

export default router;
