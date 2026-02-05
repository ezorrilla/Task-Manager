import { v4 as generarUuid } from 'uuid';
import { Task } from '../../../domain/entities/task';
import { TaskRepositoryPort } from '../../../domain/ports/task-repository.port';
import { CreateTaskDto, TaskResponseDto } from '../../dtos/create-task.dto';
import { TaskMapper } from '../../mappers/task.mapper';

export class CreateTaskUseCase {
  constructor(
    private readonly repositorioTareas: TaskRepositoryPort
  ) {}

  async ejecutar(dto: CreateTaskDto, usuarioId: string): Promise<TaskResponseDto> {
    const nuevaTarea = new Task({
      id: generarUuid(),
      titulo: dto.titulo,
      descripcion: dto.descripcion,
      completada: false,
      fechaCreacion: new Date(),
      usuarioId,
    });

    const tareaCreada = await this.repositorioTareas.crear(nuevaTarea);

    return TaskMapper.toResponseDto(tareaCreada);
  }
}
