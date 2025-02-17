import { CustomError } from './customError';
export function badRequest(message: string, details: unknown = null, code = 400): CustomError {
  return new CustomError(message, code, details);
}