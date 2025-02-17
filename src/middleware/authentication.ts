import { NextFunction, Request, Response } from 'express';
import { verify, decode, JwtPayload } from 'jsonwebtoken';
import { unauthorized } from '../error/unauthorized';

export function authentication(req: Request, res: Response, next: NextFunction) {
  try {
    const token: string | undefined = req.headers.authorization;

    if (!token) {
      throw unauthorized('Access token não informado');
    }

    const [, accessToken] = token ? token.split(' ') : ['', ''];
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
      throw unauthorized('JWT secret key não informado');
    }

    verify(accessToken, secretKey);

    const decoded = decode(accessToken) as JwtPayload;

    if (!decoded || !decoded.id || !decoded.email) {
      throw unauthorized('Token inválido');
    }

    req.userId = decoded.id as string;
    req.userEmail = decoded.email as string;
    return next();
  } catch (err) {
    return next(err);
  }
}
