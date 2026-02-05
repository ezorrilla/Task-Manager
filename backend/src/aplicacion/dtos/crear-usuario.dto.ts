export interface CrearUsuarioDto {
  correo: string;
}

export interface UsuarioRespuestaDto {
  id: string;
  correo: string;
  fechaCreacion: string;
  token: string;
}
