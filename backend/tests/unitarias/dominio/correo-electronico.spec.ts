import { CorreoElectronico } from '../../../src/dominio/value-objects/correo-electronico';

describe('CorreoElectronico', () => {
  describe('constructor', () => {
    it('deberia crear un correo valido', () => {
      const correo = new CorreoElectronico('usuario@ejemplo.com');
      expect(correo.obtenerValor()).toBe('usuario@ejemplo.com');
    });

    it('deberia normalizar el correo a minusculas', () => {
      const correo = new CorreoElectronico('USUARIO@EJEMPLO.COM');
      expect(correo.obtenerValor()).toBe('usuario@ejemplo.com');
    });

    it('deberia eliminar espacios en blanco', () => {
      const correo = new CorreoElectronico('  usuario@ejemplo.com  ');
      expect(correo.obtenerValor()).toBe('usuario@ejemplo.com');
    });

    it('deberia lanzar error para correo invalido sin @', () => {
      expect(() => new CorreoElectronico('correoinvalido')).toThrow(
        'Correo electronico invalido'
      );
    });

    it('deberia lanzar error para correo invalido sin dominio', () => {
      expect(() => new CorreoElectronico('usuario@')).toThrow(
        'Correo electronico invalido'
      );
    });

    it('deberia lanzar error para correo vacio', () => {
      expect(() => new CorreoElectronico('')).toThrow('Correo electronico invalido');
    });
  });

  describe('esIgual', () => {
    it('deberia retornar true para correos iguales', () => {
      const correo1 = new CorreoElectronico('test@ejemplo.com');
      const correo2 = new CorreoElectronico('test@ejemplo.com');
      expect(correo1.esIgual(correo2)).toBe(true);
    });

    it('deberia retornar false para correos diferentes', () => {
      const correo1 = new CorreoElectronico('test1@ejemplo.com');
      const correo2 = new CorreoElectronico('test2@ejemplo.com');
      expect(correo1.esIgual(correo2)).toBe(false);
    });
  });
});
