import { Router } from "express";
import { UsuarioController } from "../controller/UsuarioController";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { validateDto } from "../middleware/validationMiddleware";
import { CreateUsuarioDto, UpdateUsuarioDto } from "../dto/usuario.dto";
import { adotanteRep, usuarioRep } from "../constants/repository";
import { authentication } from "../middleware/authentication";

const router = Router();

const usuarioRepository = new UsuarioRepository(usuarioRep, adotanteRep);
const usuarioController = new UsuarioController(usuarioRepository);

router.post("/", validateDto(CreateUsuarioDto), (req, res, next) =>
  usuarioController.createUsuario(req, res, next),
);

router.put(
  "/:id",
  (req, res, next) => authentication(req, res, next),
  validateDto(UpdateUsuarioDto, false, true),
  (req, res, next) => usuarioController.updateUsuario(req, res, next),
);

router.delete(
  "/:id",
  (req, res, next) => authentication(req, res, next),
  (req, res, next) => usuarioController.deleteUsuario(req, res, next),
);

router.post("/login", (req, res, next) => usuarioController.login(req, res, next));

export default router;
