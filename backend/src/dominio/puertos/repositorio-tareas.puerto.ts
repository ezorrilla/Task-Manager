import { Tarea } from '../entidades/tarea';

export interface RepositorioTareasPuerto {
  obtenerPorUsuario(usuarioId: string): Promise<Tarea[]>;
  obtenerPorId(id: string, usuarioId: string): Promise<Tarea | null>;
  crear(tarea: Tarea): Promise<Tarea>;
  actualizar(tarea: Tarea): Promise<Tarea>;
  eliminar(id: string, usuarioId: string): Promise<void>;
}
