import { CustomError } from "./customError";
export function notFound(message: string, details: unknown = null, code = 404): CustomError {
  return new CustomError(message, code, details);
}
