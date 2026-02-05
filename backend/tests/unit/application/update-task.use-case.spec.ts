import { UpdateTaskUseCase } from '../../../src/application/use-cases/tasks/update-task.use-case';
import { TaskRepositoryPort } from '../../../src/domain/ports/task-repository.port';
import { Task } from '../../../src/domain/entities/task';

describe('UpdateTaskUseCase', () => {
  let mockRepositorio: jest.Mocked<TaskRepositoryPort>;
  let casoUso: UpdateTaskUseCase;

  const tareaExistente = new Task({
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
    casoUso = new UpdateTaskUseCase(mockRepositorio);
  });

  it('deberia actualizar el titulo de una tarea', async () => {
    mockRepositorio.obtenerPorId.mockResolvedValue(tareaExistente);
    mockRepositorio.actualizar.mockImplementation(async (tarea: Task) => tarea);

    const resultado = await casoUso.ejecutar(
      'tarea-123',
      { titulo: 'Titulo actualizado' },
      'usuario-123'
    );

    expect(resultado.titulo).toBe('Titulo actualizado');
  });

  it('deberia marcar tarea como completada', async () => {
    mockRepositorio.obtenerPorId.mockResolvedValue(tareaExistente);
    mockRepositorio.actualizar.mockImplementation(async (tarea: Task) => tarea);

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
