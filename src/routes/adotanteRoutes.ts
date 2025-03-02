import { adocaoPetsDto } from './../dto/adocaoPets.dto';
import { AdotanteController } from './../controller/AdotanteController';
import { AdotanteRepository } from './../repository/AdotanteRepository';
import { Router } from 'express';
import { validateDto } from '../middleware/validationMiddleware';
import { PetRepository } from '../repository/PetRepository';
import { EnderecoDto } from '../dto/endereco.dto';
import { authentication } from '../middleware/authentication';
import { adotanteRep, petRep } from '../constants/repository';
import { verificaIdMiddleware } from '../middleware/validateParams';

const router = Router();

const adotanteRepository = new AdotanteRepository(adotanteRep);
const petRepository = new PetRepository(petRep);
const adotanteController = new AdotanteController(adotanteRepository, petRepository);

router.get('/', adotanteController.listAdotante.bind(adotanteController));

router.patch(
  '/:id',
  authentication,
  verificaIdMiddleware,
  validateDto(EnderecoDto, { isUpdate: true }),
  adotanteController.updateEndereco.bind(adotanteController)
);

router.put(
  '/:adotanteId/pets',
  authentication,
  verificaIdMiddleware,
  validateDto(adocaoPetsDto, { isUpdate: true }),
  adotanteController.adotaPet.bind(adotanteController)
);

export default router;
