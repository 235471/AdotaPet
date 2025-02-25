import { NextFunction, Request, Response } from "express";
import { verify, decode, JwtPayload } from "jsonwebtoken";
import { unauthorized } from "../error/unauthorized";

export function authentication(req: Request, res: Response, next: NextFunction) {
  
  const token: string | undefined = req.headers.authorization;

  if (!token) {
    return next(unauthorized("Access token não informado"));
  }

  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    return next(unauthorized("Secret key não informada"));
  }

  const [, accessToken] = token ? token.split(" ") : ["", ""];

  try {
    verify(accessToken, secretKey);

    const decoded = decode(accessToken) as JwtPayload;

    if (!decoded || !decoded.id || !decoded.email) {
      return next(unauthorized("Token inválido"));
    }

    req.userId = decoded.id as string;
    req.userEmail = decoded.email as string;
    return next();
  } catch (err: unknown) {
    return next(unauthorized("Erro de autenticação"));
  }
}
