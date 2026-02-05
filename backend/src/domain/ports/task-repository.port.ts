import { Task } from '../entities/task';

export interface TaskRepositoryPort {
  obtenerPorUsuario(usuarioId: string): Promise<Task[]>;
  obtenerPorId(id: string, usuarioId: string): Promise<Task | null>;
  crear(tarea: Task): Promise<Task>;
  actualizar(tarea: Task): Promise<Task>;
  eliminar(id: string, usuarioId: string): Promise<void>;
}
