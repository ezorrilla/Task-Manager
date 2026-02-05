import { User } from '../../../src/domain/entities/user';
import { Email } from '../../../src/domain/value-objects/email';

describe('User', () => {
  describe('constructor', () => {
    it('deberia crear un usuario valido', () => {
      const correo = new Email('test@ejemplo.com');
      const usuario = new User({
        id: 'usuario-123',
        nombre: 'Juan Perez',
        correo,
        fechaCreacion: new Date('2024-01-01'),
      });

      expect(usuario.id).toBe('usuario-123');
      expect(usuario.nombre).toBe('Juan Perez');
      expect(usuario.correo).toBe(correo);
    });

    it('deberia lanzar error si el nombre es muy corto', () => {
      const correo = new Email('test@ejemplo.com');

      expect(() => new User({
        id: 'usuario-123',
        nombre: 'J',
        correo,
        fechaCreacion: new Date(),
      })).toThrow('El nombre debe tener al menos 2 caracteres');
    });

    it('deberia lanzar error si el nombre esta vacio', () => {
      const correo = new Email('test@ejemplo.com');

      expect(() => new User({
        id: 'usuario-123',
        nombre: '',
        correo,
        fechaCreacion: new Date(),
      })).toThrow('El nombre debe tener al menos 2 caracteres');
    });

    it('deberia recortar espacios del nombre', () => {
      const correo = new Email('test@ejemplo.com');
      const usuario = new User({
        id: 'usuario-123',
        nombre: '  Juan Perez  ',
        correo,
        fechaCreacion: new Date(),
      });

      expect(usuario.nombre).toBe('Juan Perez');
    });
  });

  describe('obtenerCorreoTexto', () => {
    it('deberia retornar el valor del correo como texto', () => {
      const correo = new Email('test@ejemplo.com');
      const usuario = new User({
        id: 'usuario-123',
        nombre: 'Juan Perez',
        correo,
        fechaCreacion: new Date(),
      });

      expect(usuario.obtenerCorreoTexto()).toBe('test@ejemplo.com');
    });
  });
});
