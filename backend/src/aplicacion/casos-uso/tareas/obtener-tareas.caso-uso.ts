import { RepositorioTareasPuerto } from '../../../dominio/puertos/repositorio-tareas.puerto';
import { TareaRespuestaDto } from '../../dtos/crear-tarea.dto';
import { TareaMapeador } from '../../mapeadores/tarea.mapeador';

export class ObtenerTareasCasoUso {
  constructor(
    private readonly repositorioTareas: RepositorioTareasPuerto
  ) {}

  async ejecutar(usuarioId: string): Promise<TareaRespuestaDto[]> {
    const tareas = await this.repositorioTareas.obtenerPorUsuario(usuarioId);

    const tareasOrdenadas = tareas.sort(
      (a, b) => b.fechaCreacion.getTime() - a.fechaCreacion.getTime()
    );

    return TareaMapeador.aListaRespuestaDto(tareasOrdenadas);
  }
}
