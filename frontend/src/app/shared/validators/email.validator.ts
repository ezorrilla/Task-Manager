import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validateEmail(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;

  if (!valor) {
    return null;
  }

  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const esValido = patronCorreo.test(valor);

  return esValido ? null : { correoInvalido: true };
}
