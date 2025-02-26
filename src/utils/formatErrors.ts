import { ValidationError } from "class-validator";
import { FormattedError } from "../interface/FormattedError";

export function formatErrors(errors: ValidationError[]): FormattedError[] {
  return errors.map((err) => ({
    property: err.property,
    constraints: err.constraints,
  }));
}
