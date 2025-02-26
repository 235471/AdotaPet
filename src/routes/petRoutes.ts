import { PetRepository } from './../repository/PetRepository';
import { Router } from 'express';
import { PetController } from '../controller/PetController';
import { IPetController } from '../interface/PetController';
import { validateDto } from '../middleware/validationMiddleware';
import { CreatePetDto, QueryPetDto, UpdatePetDto } from '../dto/pet.dto';
import { authentication } from '../middleware/authentication';
import { petRep } from '../constants/repository';
import { validateQueryParams } from '../middleware/validateQueryParams';

const router = Router();

const petRepository = new PetRepository(petRep);
const petController: IPetController = new PetController(petRepository);

// Defina explicitamente os tipos dos parâmetros
router.get('/', (req, res, next) => petController.listAll(req, res, next));

router.get('/porte', (req, res, next) => petController.listByPorte(req, res, next));

router.get('/search', validateQueryParams(QueryPetDto), (req, res, next) =>
  petController.listBy(req, res, next)
);

router.post(
  '/',
  (req, res, next) => authentication(req, res, next),
  validateDto(CreatePetDto, { isArray: true, isUpdate: false }),
  (req, res, next) => petController.createPets(req, res, next)
);
router.put(
  '/:id',
  (req, res, next) => authentication(req, res, next),
  validateDto(UpdatePetDto, { isUpdate: true }),
  (req, res, next) => petController.updatePet(req, res, next)
);
router.delete(
  '/:id',
  (req, res, next) => authentication(req, res, next),
  (req, res, next) => petController.deletePet(req, res, next)
);

export default router;
