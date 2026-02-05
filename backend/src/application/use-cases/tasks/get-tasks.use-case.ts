import { TaskRepositoryPort } from '../../../domain/ports/task-repository.port';
import { TaskResponseDto } from '../../dtos/create-task.dto';
import { TaskMapper } from '../../mappers/task.mapper';

export class GetTasksUseCase {
  constructor(
    private readonly repositorioTareas: TaskRepositoryPort
  ) {}

  async ejecutar(usuarioId: string): Promise<TaskResponseDto[]> {
    const tareas = await this.repositorioTareas.obtenerPorUsuario(usuarioId);

    return TaskMapper.toResponseDtoList(tareas);
  }
}
