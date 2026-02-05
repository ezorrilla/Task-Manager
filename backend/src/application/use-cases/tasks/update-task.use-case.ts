import { TaskRepositoryPort } from '../../../domain/ports/task-repository.port';
import { UpdateTaskDto } from '../../dtos/update-task.dto';
import { TaskResponseDto } from '../../dtos/create-task.dto';
import { TaskMapper } from '../../mappers/task.mapper';

export class UpdateTaskUseCase {
  constructor(
    private readonly repositorioTareas: TaskRepositoryPort
  ) {}

  async ejecutar(
    tareaId: string,
    dto: UpdateTaskDto,
    usuarioId: string
  ): Promise<TaskResponseDto> {
    const tarea = await this.repositorioTareas.obtenerPorId(tareaId, usuarioId);

    if (!tarea) {
      throw new Error('Tarea no encontrada');
    }

    if (dto.titulo !== undefined) {
      tarea.actualizarTitulo(dto.titulo);
    }

    if (dto.descripcion !== undefined) {
      tarea.actualizarDescripcion(dto.descripcion);
    }

    if (dto.completada !== undefined) {
      dto.completada ? tarea.marcarComoCompletada() : tarea.marcarComoPendiente();
    }

    const tareaActualizada = await this.repositorioTareas.actualizar(tarea);

    return TaskMapper.toResponseDto(tareaActualizada);
  }
}
