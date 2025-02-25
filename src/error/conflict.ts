import { CustomError } from './customError';

export function conflict(message: string, details: unknown = null): CustomError {
  return new CustomError(message, 409, details);
}
