import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { badRequest } from '../error/badRequest';
import { formatErrors } from '../utils/formatErrors';

export function validateQueryParams<T extends object>(dto: ClassConstructor<T>) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Normalizar valores string no req.query para lowercase
      const normalizedQuery = normalizeQueryValues(req.query);

      // Converter query params para a instância do DTO
      const queryInstance = plainToInstance(dto, normalizedQuery, {
        enableImplicitConversion: true, // Converte strings para os tipos apropriados
      });

      // Validar a instância
      const errors = await validate(queryInstance, {
        whitelist: true,
        forbidNonWhitelisted: true,
        skipMissingProperties: true,
      });

      if (errors.length > 0) {
        const errorDetails = formatErrors(errors);
        throw badRequest('Parâmetros de consulta inválidos', errorDetails);
      }

      req.query = queryInstance as any;
      next();
    } catch (err) {
      next(err);
    }
  };
}

/**
 * Normaliza valores string em um objeto para lowercase e transforma listas em arrays
 */
function normalizeQueryValues(query: any): any {
  const normalized: any = {};

  for (const key in query) {
    const value = query[key];

    if (typeof value === 'string') {
      // Se o valor contém vírgulas, transforma em array
      if (value.includes(',')) {
        normalized[key] = value.split(',').map((item) => item.trim().toLowerCase());
      } else {
        normalized[key] = value.trim().toLowerCase();
      }
    } else {
      normalized[key] = value;
    }
  }

  return normalized;
}
