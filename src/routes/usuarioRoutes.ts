import { Router } from 'express';
import { UsuarioController } from '../controller/UsuarioController';
import { UsuarioRepository } from '../repository/UsuarioRepository';
import { validateDto } from '../middleware/validationMiddleware';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../dto/usuario.dto';
import { abrigoRep, adotanteRep, usuarioRep } from '../constants/repository';
import { authentication } from '../middleware/authentication';
import { CreateAbrigoDto } from '../dto/abrigo.dto';
import { addTipoUsuario } from '../middleware/tipoUsuario';
import { UserTypes } from '../enum/userTypes';

const router = Router();

const usuarioRepository = new UsuarioRepository(usuarioRep, adotanteRep, abrigoRep);
const usuarioController = new UsuarioController(usuarioRepository);

router.post(
  '/adotante',
  validateDto(CreateUsuarioDto),
  addTipoUsuario(UserTypes.adotante),
  usuarioController.createUsuario.bind(usuarioController)
);

router.post(
  '/abrigo',
  validateDto(CreateAbrigoDto),
  addTipoUsuario(UserTypes.abrigo),
  usuarioController.createUsuario.bind(usuarioController)
);

router.put(
  '/:id',
  authentication,
  validateDto(UpdateUsuarioDto, { isUpdate: true }),
  usuarioController.updateUsuario.bind(usuarioController)
);

router.delete('/:id', authentication, usuarioController.deleteUsuario.bind(usuarioController));

router.post('/login', usuarioController.login.bind(usuarioController));

export default router;
