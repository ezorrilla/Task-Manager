export interface CreateTaskDto {
  titulo: string;
  descripcion: string;
}

export interface TaskResponseDto {
  id: string;
  titulo: string;
  descripcion: string;
  completada: boolean;
  fechaCreacion: string;
  usuarioId: string;
}
