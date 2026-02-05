export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  completada: boolean;
  fechaCreacion: string;
  usuarioId: string;
}

export interface CrearTareaDto {
  titulo: string;
  descripcion: string;
}

export interface ActualizarTareaDto {
  titulo?: string;
  descripcion?: string;
  completada?: boolean;
}
