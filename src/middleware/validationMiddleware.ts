import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { badRequest } from '../error/badRequest';
import { formatErrors } from '../utils/formatErrors';

// Interfaces para os tipos de opções
interface BaseOptions {
  isUpdate?: boolean;
}

interface ArrayOptions extends BaseOptions {
  isArray: true;
}

interface SingleOptions extends BaseOptions {
  isArray?: false;
}

type ValidateOptions = ArrayOptions | SingleOptions;

// Overloads mais precisos
export function validateDto<T extends object>(
  dto: ClassConstructor<T>
): (req: Request, res: Response, next: NextFunction) => Promise<void>;

export function validateDto<T extends object>(
  dto: ClassConstructor<T>,
  options: SingleOptions
): (req: Request, res: Response, next: NextFunction) => Promise<void>;

export function validateDto<T extends object>(
  dto: ClassConstructor<T>,
  options: ArrayOptions
): (req: Request, res: Response, next: NextFunction) => Promise<void>;

// Implementação que unifica
export function validateDto<T extends object>(dto: ClassConstructor<T>, options?: ValidateOptions) {
  // Valores padrão
  const isArray = options?.isArray || false;
  const isUpdate = options?.isUpdate || false;

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

      const filteredErros = filterEmptyConstraints(errors);
      
      if (filteredErros.length > 0) {
        const errorDetails = formatErrors(filteredErros);
        throw badRequest('Dados inválidos', errorDetails);
      }

      req.body = dtoInstances;
      next();
    } catch (err) {
      next(err);
    }
  };
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

function filterEmptyConstraints(errors: ValidationError[]): ValidationError[] {
  return errors.map((error) => {
    const details = Object.entries(error.constraints || {}).filter(
      ([key, value]) => value !== '' // Remove constraints com valor vazio
    );
    return {
      ...error,
      constraints: Object.fromEntries(details),
    };
  });
}
