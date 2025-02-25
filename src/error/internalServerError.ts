import { CustomError } from './customError';

export function internalServerError(message: string, details: unknown = null): CustomError {
  return new CustomError(message, 500, details);
}
