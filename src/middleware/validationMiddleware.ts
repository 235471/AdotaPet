import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { FormattedError } from '../interface/FormattedError';
import { badRequest } from '../error/badRequest';

interface PhoneValidatable {
  validatePhone: () => void;
}

export function validateDto<T extends object>(
  dto: ClassConstructor<T>,
  isArray = false,
  isUpdate = false
) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validação do formato do body
      if (!isValidBodyFormat(req.body, isArray)) {
        const expectedFormat = isArray ? 'array' : 'objeto';
        throw badRequest(`O corpo da requisição deve ser um ${expectedFormat}`);
      }

      // Conversão dos dados para instâncias do DTO
      const dtoInstances = convertToDto(req.body, dto, isArray);

      // Validação dos dados
      const errors = await validateDtoInstances(dtoInstances, isArray, isUpdate);

      if (errors.length > 0) {
        const errorDetails = formatErrors(errors);
        throw badRequest('Dados inválidos', errorDetails);
      }

      // Se o DTO tem validação customizada do celular, chamamos ela aqui
      if (!Array.isArray(dtoInstances) && isPhoneValidatable(dtoInstances)) {
        dtoInstances.validatePhone();
      }
      
      req.body = dtoInstances;
      next();
    } catch (err) {
      next(err);
    }
  };
}

function isPhoneValidatable(obj: any): obj is PhoneValidatable {
  return typeof obj.validatePhone === 'function';
}

// Funções auxiliares
function isValidBodyFormat(body: unknown, isArray: boolean): boolean {
  return isArray ? Array.isArray(body) : !Array.isArray(body);
}

function convertToDto<T>(body: unknown, dto: ClassConstructor<T>, isArray: boolean): T | T[] {
  return isArray
    ? (body as unknown[]).map((item) => plainToInstance(dto, item))
    : plainToInstance(dto, body);
}

async function validateDtoInstances<T extends object>(
  instances: T | T[],
  isArray: boolean,
  isUpdate: boolean
): Promise<ValidationError[]> {
  const validateOptions = {
    whitelist: true,
    forbidNonWhitelisted: true,
    skipMissingProperties: isUpdate, // Permitir campos faltantes apenas para atualizações
  };

  if (isArray) {
    const arrayInstances = instances as T[];
    const validationPromises = arrayInstances.map((instance) =>
      validate(instance, validateOptions)
    );
    const validationResults = await Promise.all(validationPromises);
    return validationResults.flat();
  }

  return validate(instances as T, validateOptions);
}

function formatErrors(errors: ValidationError[]): FormattedError[] {
  return errors.map((err) => ({
    property: err.property,
    constraints: err.constraints,
  }));
}
