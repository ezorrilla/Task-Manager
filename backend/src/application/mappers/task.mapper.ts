import { Task } from '../../domain/entities/task';
import { TaskResponseDto } from '../dtos/create-task.dto';

export class TaskMapper {
  static toResponseDto(tarea: Task): TaskResponseDto {
    return {
      id: tarea.id,
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      completada: tarea.completada,
      fechaCreacion: tarea.fechaCreacion.toISOString(),
      usuarioId: tarea.usuarioId,
    };
  }

  static toResponseDtoList(tareas: Task[]): TaskResponseDto[] {
    return tareas.map(this.toResponseDto);
  }
}
