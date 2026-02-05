import { RepositorioTareasPuerto } from '../../../dominio/puertos/repositorio-tareas.puerto';
import { ActualizarTareaDto } from '../../dtos/actualizar-tarea.dto';
import { TareaRespuestaDto } from '../../dtos/crear-tarea.dto';
import { TareaMapeador } from '../../mapeadores/tarea.mapeador';

export class ActualizarTareaCasoUso {
  constructor(
    private readonly repositorioTareas: RepositorioTareasPuerto
  ) {}

  async ejecutar(
    tareaId: string,
    dto: ActualizarTareaDto,
    usuarioId: string
  ): Promise<TareaRespuestaDto> {
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

    return TareaMapeador.aRespuestaDto(tareaActualizada);
  }
}
