import { TaskRepositoryPort } from '../../../domain/ports/task-repository.port';

export class DeleteTaskUseCase {
  constructor(
    private readonly repositorioTareas: TaskRepositoryPort
  ) {}

  async ejecutar(tareaId: string, usuarioId: string): Promise<void> {
    const tarea = await this.repositorioTareas.obtenerPorId(tareaId, usuarioId);

    if (!tarea) {
      throw new Error('Tarea no encontrada');
    }

    await this.repositorioTareas.eliminar(tareaId, usuarioId);
  }
}
