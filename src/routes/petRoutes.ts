import { PetRepository } from './../repository/PetRepository';
import { Router } from 'express';
import { PetController } from '../controller/PetController';
import { IPetController } from '../interface/PetController';
import { validateDto } from '../middleware/validationMiddleware';
import { CreatePetDto, UpdatePetDto } from '../dto/pet.dto';
import { AppDataSource } from '../config/dataSource';
import { authentication } from '../middleware/authentication';
const router = Router();

const petRepository = new PetRepository(AppDataSource.getRepository('PetEntity'));
const petController: IPetController = new PetController(petRepository);

// Defina explicitamente os tipos dos parâmetros
router.get(
  '/',
  (req, res, next) => authentication(req, res, next),
  (req, res, next) => petController.listAll(req, res, next)
);

router.post('/', validateDto(CreatePetDto, true), (req, res, next) =>
  petController.createPets(req, res, next)
);
router.put('/:id', validateDto(UpdatePetDto, false, true), (req, res, next) =>
  petController.updatePet(req, res, next)
);
router.delete('/:id', (req, res, next) => petController.deletePet(req, res, next));

export default router;
