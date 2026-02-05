import { Email } from '../../../src/domain/value-objects/email';

describe('Email', () => {
  describe('constructor', () => {
    it('deberia crear un correo valido', () => {
      const correo = new Email('usuario@ejemplo.com');
      expect(correo.obtenerValor()).toBe('usuario@ejemplo.com');
    });

    it('deberia normalizar el correo a minusculas', () => {
      const correo = new Email('USUARIO@EJEMPLO.COM');
      expect(correo.obtenerValor()).toBe('usuario@ejemplo.com');
    });

    it('deberia eliminar espacios en blanco', () => {
      const correo = new Email('  usuario@ejemplo.com  ');
      expect(correo.obtenerValor()).toBe('usuario@ejemplo.com');
    });

    it('deberia lanzar error para correo invalido sin @', () => {
      expect(() => new Email('correoinvalido')).toThrow(
        'Correo electronico invalido'
      );
    });

    it('deberia lanzar error para correo invalido sin dominio', () => {
      expect(() => new Email('usuario@')).toThrow(
        'Correo electronico invalido'
      );
    });

    it('deberia lanzar error para correo vacio', () => {
      expect(() => new Email('')).toThrow('Correo electronico invalido');
    });
  });

  describe('esIgual', () => {
    it('deberia retornar true para correos iguales', () => {
      const correo1 = new Email('test@ejemplo.com');
      const correo2 = new Email('test@ejemplo.com');
      expect(correo1.esIgual(correo2)).toBe(true);
    });

    it('deberia retornar false para correos diferentes', () => {
      const correo1 = new Email('test1@ejemplo.com');
      const correo2 = new Email('test2@ejemplo.com');
      expect(correo1.esIgual(correo2)).toBe(false);
    });
  });
});
