import { CustomError } from "./customError";

export function unauthorized(message: string, details: unknown = null, code = 401): CustomError {
  return new CustomError(message, code, details);
}
