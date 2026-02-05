import { Tarea } from '../../../src/dominio/entidades/tarea';

describe('Tarea', () => {
  const propiedadesBase = {
    id: 'tarea-123',
    titulo: 'Mi tarea',
    descripcion: 'Descripcion de prueba',
    completada: false,
    fechaCreacion: new Date(),
    usuarioId: 'usuario-123',
  };

  describe('constructor', () => {
    it('deberia crear una tarea valida', () => {
      const tarea = new Tarea(propiedadesBase);

      expect(tarea.id).toBe('tarea-123');
      expect(tarea.titulo).toBe('Mi tarea');
      expect(tarea.descripcion).toBe('Descripcion de prueba');
      expect(tarea.completada).toBe(false);
      expect(tarea.usuarioId).toBe('usuario-123');
    });

    it('deberia recortar espacios del titulo y descripcion', () => {
      const tarea = new Tarea({
        ...propiedadesBase,
        titulo: '  Titulo con espacios  ',
        descripcion: '  Descripcion con espacios  ',
      });

      expect(tarea.titulo).toBe('Titulo con espacios');
      expect(tarea.descripcion).toBe('Descripcion con espacios');
    });

    it('deberia lanzar error si el titulo esta vacio', () => {
      expect(
        () => new Tarea({ ...propiedadesBase, titulo: '' })
      ).toThrow('El titulo de la tarea es obligatorio');
    });

    it('deberia lanzar error si el titulo excede 100 caracteres', () => {
      const tituloLargo = 'a'.repeat(101);
      expect(
        () => new Tarea({ ...propiedadesBase, titulo: tituloLargo })
      ).toThrow('El titulo no puede exceder los 100 caracteres');
    });
  });

  describe('actualizarTitulo', () => {
    it('deberia actualizar el titulo correctamente', () => {
      const tarea = new Tarea(propiedadesBase);
      tarea.actualizarTitulo('Nuevo titulo');
      expect(tarea.titulo).toBe('Nuevo titulo');
    });

    it('deberia lanzar error si el nuevo titulo esta vacio', () => {
      const tarea = new Tarea(propiedadesBase);
      expect(() => tarea.actualizarTitulo('')).toThrow(
        'El titulo de la tarea es obligatorio'
      );
    });
  });

  describe('actualizarDescripcion', () => {
    it('deberia actualizar la descripcion correctamente', () => {
      const tarea = new Tarea(propiedadesBase);
      tarea.actualizarDescripcion('Nueva descripcion');
      expect(tarea.descripcion).toBe('Nueva descripcion');
    });
  });

  describe('marcarComoCompletada', () => {
    it('deberia marcar la tarea como completada', () => {
      const tarea = new Tarea(propiedadesBase);
      tarea.marcarComoCompletada();
      expect(tarea.completada).toBe(true);
    });
  });

  describe('marcarComoPendiente', () => {
    it('deberia marcar la tarea como pendiente', () => {
      const tarea = new Tarea({ ...propiedadesBase, completada: true });
      tarea.marcarComoPendiente();
      expect(tarea.completada).toBe(false);
    });
  });

  describe('alternarEstado', () => {
    it('deberia alternar de pendiente a completada', () => {
      const tarea = new Tarea(propiedadesBase);
      tarea.alternarEstado();
      expect(tarea.completada).toBe(true);
    });

    it('deberia alternar de completada a pendiente', () => {
      const tarea = new Tarea({ ...propiedadesBase, completada: true });
      tarea.alternarEstado();
      expect(tarea.completada).toBe(false);
    });
  });
});
