import { adocaoPetsDto } from './../dto/adocaoPets.dto';
import { AdotanteController } from './../controller/AdotanteController';
import { AppDataSource } from '../config/dataSource';
import { AdotanteRepository } from './../repository/AdotanteRepository';
import { Router } from 'express';
import { validateDto } from '../middleware/validationMiddleware';
import { CreateAdotanteDto, UpdateAdotantetDto } from '../dto/adotante.dto';
import { PetRepository } from '../repository/PetRepository';
import { EnderecoDto } from '../dto/endereco.dto';
import { authentication } from '../middleware/authentication';

const router = Router();

const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository('AdotanteEntity'));
const petRepository = new PetRepository(AppDataSource.getRepository('PetEntity'));
const adotanteController = new AdotanteController(adotanteRepository, petRepository);

router.get('/', (req, res, next) => adotanteController.listAdotante(req, res, next));

router.post('/', validateDto(CreateAdotanteDto), (req, res, next) =>
  adotanteController.createAdotante(req, res, next)
);

router.patch('/:id', validateDto(EnderecoDto, false, true), (req, res, next) =>
  adotanteController.updateEndereco(req, res, next)
);

router.put('/:id', validateDto(UpdateAdotantetDto, false, true), (req, res, next) =>
  adotanteController.updateAdotante(req, res, next)
);

router.delete('/:id', (req, res, next) => adotanteController.deleteAdotante(req, res, next));

router.put('/:adotanteId/pets', (req, res, next) => authentication(req, res, next),  validateDto(adocaoPetsDto, false, true), (req, res, next) =>
  adotanteController.adotaPet(req, res, next)
);

export default router;
