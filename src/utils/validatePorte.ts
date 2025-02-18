import { Porte } from '../enum/porte';
import { badRequest } from '../error/badRequest';

export function validatePorte(porte: string) {
  if (!(porte in Porte)) {
    const validValues = Object.values(Porte).join(', ');
    throw badRequest(`Valor inválido para porte: ${porte}. Valores válidos são: ${validValues}`);
  }
}