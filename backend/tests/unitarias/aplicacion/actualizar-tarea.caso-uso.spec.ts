import { ActualizarTareaCasoUso } from '../../../src/aplicacion/casos-uso/tareas/actualizar-tarea.caso-uso';
import { RepositorioTareasPuerto } from '../../../src/dominio/puertos/repositorio-tareas.puerto';
import { Tarea } from '../../../src/dominio/entidades/tarea';

describe('ActualizarTareaCasoUso', () => {
  let mockRepositorio: jest.Mocked<RepositorioTareasPuerto>;
  let casoUso: ActualizarTareaCasoUso;

  const tareaExistente = new Tarea({
    id: 'tarea-123',
    titulo: 'Tarea original',
    descripcion: 'Descripcion original',
    completada: false,
    fechaCreacion: new Date(),
    usuarioId: 'usuario-123',
  });

  beforeEach(() => {
    mockRepositorio = {
      obtenerPorUsuario: jest.fn(),
      obtenerPorId: jest.fn(),
      crear: jest.fn(),
      actualizar: jest.fn(),
      eliminar: jest.fn(),
    };
    casoUso = new ActualizarTareaCasoUso(mockRepositorio);
  });

  it('deberia actualizar el titulo de una tarea', async () => {
    mockRepositorio.obtenerPorId.mockResolvedValue(tareaExistente);
    mockRepositorio.actualizar.mockImplementation(async (tarea: Tarea) => tarea);

    const resultado = await casoUso.ejecutar(
      'tarea-123',
      { titulo: 'Titulo actualizado' },
      'usuario-123'
    );

    expect(resultado.titulo).toBe('Titulo actualizado');
  });

  it('deberia marcar tarea como completada', async () => {
    mockRepositorio.obtenerPorId.mockResolvedValue(tareaExistente);
    mockRepositorio.actualizar.mockImplementation(async (tarea: Tarea) => tarea);

    const resultado = await casoUso.ejecutar(
      'tarea-123',
      { completada: true },
      'usuario-123'
    );

    expect(resultado.completada).toBe(true);
  });

  it('deberia lanzar error si la tarea no existe', async () => {
    mockRepositorio.obtenerPorId.mockResolvedValue(null);

    await expect(
      casoUso.ejecutar('tarea-inexistente', { titulo: 'Test' }, 'usuario-123')
    ).rejects.toThrow('Tarea no encontrada');
  });
});
