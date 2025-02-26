import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotBlank', async: false })
export class IsNotBlankConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return typeof value === 'string' && value.trim().length > 0; // Remove espaços e verifica se há conteúdo
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} não pode estar vazio ou conter apenas espaços`;
  }
}

// Decorator para uso nos DTOs
export function IsNotBlank() {
  return Validate(IsNotBlankConstraint);
}
