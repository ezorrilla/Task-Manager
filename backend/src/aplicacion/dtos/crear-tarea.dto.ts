export interface CrearTareaDto {
  titulo: string;
  descripcion: string;
}

export interface TareaRespuestaDto {
  id: string;
  titulo: string;
  descripcion: string;
  completada: boolean;
  fechaCreacion: string;
  usuarioId: string;
}
