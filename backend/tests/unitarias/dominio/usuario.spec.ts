import { Usuario } from '../../../src/dominio/entidades/usuario';
import { CorreoElectronico } from '../../../src/dominio/value-objects/correo-electronico';

describe('Usuario', () => {
  describe('constructor', () => {
    it('deberia crear un usuario valido', () => {
      const correo = new CorreoElectronico('test@ejemplo.com');
      const usuario = new Usuario({
        id: 'usuario-123',
        correo,
        fechaCreacion: new Date('2024-01-01'),
        token: 'token-abc-123',
      });

      expect(usuario.id).toBe('usuario-123');
      expect(usuario.correo).toBe(correo);
      expect(usuario.token).toBe('token-abc-123');
    });
  });

  describe('obtenerCorreoTexto', () => {
    it('deberia retornar el valor del correo como texto', () => {
      const correo = new CorreoElectronico('test@ejemplo.com');
      const usuario = new Usuario({
        id: 'usuario-123',
        correo,
        fechaCreacion: new Date(),
        token: 'token-abc',
      });

      expect(usuario.obtenerCorreoTexto()).toBe('test@ejemplo.com');
    });
  });
});
