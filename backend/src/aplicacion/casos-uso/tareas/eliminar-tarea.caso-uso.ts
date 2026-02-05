import { RepositorioTareasPuerto } from '../../../dominio/puertos/repositorio-tareas.puerto';

export class EliminarTareaCasoUso {
  constructor(
    private readonly repositorioTareas: RepositorioTareasPuerto
  ) {}

  async ejecutar(tareaId: string, usuarioId: string): Promise<void> {
    const tarea = await this.repositorioTareas.obtenerPorId(tareaId, usuarioId);

    if (!tarea) {
      throw new Error('Tarea no encontrada');
    }

    await this.repositorioTareas.eliminar(tareaId, usuarioId);
  }
}
