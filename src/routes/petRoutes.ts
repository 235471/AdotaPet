import { PetRepository } from './../repository/PetRepository';
import { Router } from 'express';
import { PetController } from '../controller/PetController';
import { IPetController } from '../interface/PetController';
import { validateDto } from '../middleware/validationMiddleware';
import { CreatePetDto, QueryPetDto, UpdatePetDto } from '../dto/pet.dto';
import { authentication } from '../middleware/authentication';
import { abrigoRep, petRep } from '../constants/repository';
import { validateQueryParams } from '../middleware/validateQueryParams';
import { AbrigoRepository } from '../repository/AbrigoRepository';
import { verificaIdMiddleware } from '../middleware/validateParams';

const router = Router();

const petRepository = new PetRepository(petRep);
const abrigoRepository = new AbrigoRepository(abrigoRep);
const petController: IPetController = new PetController(petRepository, abrigoRepository);

router.get('/', petController.listAll.bind(petController));

router.get('/porte', petController.listByPorte.bind(petController));

router.get('/search', validateQueryParams(QueryPetDto), petController.listBy.bind(petController));

router.post(
  '/',
  authentication,
  validateDto(CreatePetDto, { isArray: true, isUpdate: false }),
  petController.createPets.bind(petController)
);

router.put(
  '/:id',
  authentication,
  verificaIdMiddleware,
  validateDto(UpdatePetDto, { isUpdate: true }),
  petController.updatePet.bind(petController)
);

router.delete(
  '/:id',
  authentication,
  verificaIdMiddleware,
  petController.deletePet.bind(petController)
);

export default router;
