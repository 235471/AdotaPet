import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { parsePhoneNumberFromString, PhoneNumber } from 'libphonenumber-js';

export function IsValidMobileNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidMobileNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          const trimmedValue = value.trim();
          if (trimmedValue === '') return false; // Não permite strings vazias ou só espaços

          const phoneNumber = parsePhoneNumberFromString(trimmedValue, 'BR');

          // Verifica se é um número válido e se é um celular
          if (!phoneNumber || !phoneNumber.isValid()) {
            return false;
          }

          // Verifica se é um celular brasileiro
          return isBrazilianMobile(phoneNumber);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} deve ser um número de celular brasileiro válido (ex: +5511999999999 ou 11999999999)`;
        },
      },
    });
  };
}

/**
 * Verifica se um número é um celular brasileiro.
 * No Brasil, celulares têm:
 * - 11 dígitos totais (com DDD)
 * - O primeiro dígito após o DDD é sempre 9
 */
function isBrazilianMobile(phoneNumber: PhoneNumber): boolean {
  // Obtém o número nacional (sem código do país)
  const nationalNumber = phoneNumber.nationalNumber.toString();

  // Um celular brasileiro deve ter:
  // 1. 11 dígitos no total (incluindo DDD)
  // 2. O terceiro dígito (após DDD) deve ser 9

  const hasCorrectLength = nationalNumber.length === 11;
  const startsWithNine = nationalNumber.length === 11 && nationalNumber.charAt(2) === '9';

  // A biblioteca nem sempre detecta corretamente celulares brasileiros,
  // então combinamos nossa própria verificação com o resultado dela
  const detectedAsMobile = phoneNumber.getType() === 'MOBILE';
  
  return (hasCorrectLength && startsWithNine) || detectedAsMobile;
}
