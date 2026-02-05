import { Tarea } from '../../dominio/entidades/tarea';
import { TareaRespuestaDto } from '../dtos/crear-tarea.dto';

export class TareaMapeador {
  static aRespuestaDto(tarea: Tarea): TareaRespuestaDto {
    return {
      id: tarea.id,
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      completada: tarea.completada,
      fechaCreacion: tarea.fechaCreacion.toISOString(),
      usuarioId: tarea.usuarioId,
    };
  }

  static aListaRespuestaDto(tareas: Tarea[]): TareaRespuestaDto[] {
    return tareas.map(this.aRespuestaDto);
  }
}
