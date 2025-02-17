import { LoginService } from './../services/LoginService';
import { LoginController } from './../controller/LoginController';
import { Router } from 'express';

const router = Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);

router.post('/', (req, res, next) => loginController.login(req, res, next));

export default router;
