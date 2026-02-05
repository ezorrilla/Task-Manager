import { CreateTaskUseCase } from '../../../src/application/use-cases/tasks/create-task.use-case';
import { TaskRepositoryPort } from '../../../src/domain/ports/task-repository.port';
import { Task } from '../../../src/domain/entities/task';

describe('CreateTaskUseCase', () => {
  let mockRepositorio: jest.Mocked<TaskRepositoryPort>;
  let casoUso: CreateTaskUseCase;

  beforeEach(() => {
    mockRepositorio = {
      obtenerPorUsuario: jest.fn(),
      obtenerPorId: jest.fn(),
      crear: jest.fn(),
      actualizar: jest.fn(),
      eliminar: jest.fn(),
    };
    casoUso = new CreateTaskUseCase(mockRepositorio);
  });

  it('deberia crear una tarea correctamente', async () => {
    const dto = { titulo: 'Nueva tarea', descripcion: 'Descripcion de prueba' };
    const usuarioId = 'usuario-123';

    mockRepositorio.crear.mockImplementation(async (tarea: Task) => tarea);

    const resultado = await casoUso.ejecutar(dto, usuarioId);

    expect(resultado.titulo).toBe('Nueva tarea');
    expect(resultado.descripcion).toBe('Descripcion de prueba');
    expect(resultado.completada).toBe(false);
    expect(resultado.usuarioId).toBe(usuarioId);
    expect(mockRepositorio.crear).toHaveBeenCalledTimes(1);
  });

  it('deberia lanzar error si el titulo esta vacio', async () => {
    const dto = { titulo: '', descripcion: 'Descripcion' };

    await expect(casoUso.ejecutar(dto, 'usuario-123')).rejects.toThrow(
      'El titulo de la tarea es obligatorio'
    );
  });
});
