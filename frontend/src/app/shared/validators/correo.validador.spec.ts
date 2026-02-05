import { FormControl } from '@angular/forms';
import { validateEmail } from './email.validator';

describe('validateEmail', () => {
  it('deberia retornar null para correo valido', () => {
    const control = new FormControl('test@ejemplo.com');
    const resultado = validateEmail(control);
    expect(resultado).toBeNull();
  });

  it('deberia retornar null para valor vacio', () => {
    const control = new FormControl('');
    const resultado = validateEmail(control);
    expect(resultado).toBeNull();
  });

  it('deberia retornar error para correo sin @', () => {
    const control = new FormControl('testejemplo.com');
    const resultado = validateEmail(control);
    expect(resultado).toEqual({ correoInvalido: true });
  });

  it('deberia retornar error para correo sin dominio', () => {
    const control = new FormControl('test@');
    const resultado = validateEmail(control);
    expect(resultado).toEqual({ correoInvalido: true });
  });

  it('deberia retornar error para correo sin extension', () => {
    const control = new FormControl('test@ejemplo');
    const resultado = validateEmail(control);
    expect(resultado).toEqual({ correoInvalido: true });
  });

  it('deberia aceptar correos con subdominios', () => {
    const control = new FormControl('test@mail.ejemplo.com');
    const resultado = validateEmail(control);
    expect(resultado).toBeNull();
  });
});
