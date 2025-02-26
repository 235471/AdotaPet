import { adocaoPetsDto } from './../dto/adocaoPets.dto';
import { AdotanteController } from './../controller/AdotanteController';
import { AdotanteRepository } from './../repository/AdotanteRepository';
import { Router } from 'express';
import { validateDto } from '../middleware/validationMiddleware';
import { PetRepository } from '../repository/PetRepository';
import { EnderecoDto } from '../dto/endereco.dto';
import { authentication } from '../middleware/authentication';
import { adotanteRep, petRep } from '../constants/repository';

const router = Router();

const adotanteRepository = new AdotanteRepository(adotanteRep);
const petRepository = new PetRepository(petRep);
const adotanteController = new AdotanteController(adotanteRepository, petRepository);

router.get('/', (req, res, next) => adotanteController.listAdotante(req, res, next));

router.patch(
  '/:id',
  (req, res, next) => authentication(req, res, next),
  validateDto(EnderecoDto, { isUpdate: true }),
  (req, res, next) => adotanteController.updateEndereco(req, res, next)
);

router.delete(
  '/:id',
  (req, res, next) => authentication(req, res, next),
  (req, res, next) => adotanteController.deleteAdotante(req, res, next)
);

router.put(
  '/:adotanteId/pets',
  (req, res, next) => authentication(req, res, next),
  validateDto(adocaoPetsDto, { isUpdate: true }),
  (req, res, next) => adotanteController.adotaPet(req, res, next)
);

export default router;
