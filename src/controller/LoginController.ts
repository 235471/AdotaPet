import { Request, Response, NextFunction } from 'express';
import { LoginService } from '../services/LoginService';
import { LoginRequestBody } from '../interface/LoginRequestBody';

export class LoginController {
  constructor(private service: LoginService) {}
  async login(req: Request<unknown, unknown, LoginRequestBody>, res: Response, next: NextFunction) {
    try {
      const { email, senha } = req.body;

      const jwt = await this.service.login(email, senha);
      res.status(200).send(jwt);
    } catch (err: unknown) {
      next(err);
    }
  }
}
