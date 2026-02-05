import { v4 as generarUuid } from 'uuid';
import { Tarea } from '../../../dominio/entidades/tarea';
import { RepositorioTareasPuerto } from '../../../dominio/puertos/repositorio-tareas.puerto';
import { CrearTareaDto, TareaRespuestaDto } from '../../dtos/crear-tarea.dto';
import { TareaMapeador } from '../../mapeadores/tarea.mapeador';

export class CrearTareaCasoUso {
  constructor(
    private readonly repositorioTareas: RepositorioTareasPuerto
  ) {}

  async ejecutar(dto: CrearTareaDto, usuarioId: string): Promise<TareaRespuestaDto> {
    const nuevaTarea = new Tarea({
      id: generarUuid(),
      titulo: dto.titulo,
      descripcion: dto.descripcion,
      completada: false,
      fechaCreacion: new Date(),
      usuarioId,
    });

    const tareaCreada = await this.repositorioTareas.crear(nuevaTarea);

    return TareaMapeador.aRespuestaDto(tareaCreada);
  }
}
