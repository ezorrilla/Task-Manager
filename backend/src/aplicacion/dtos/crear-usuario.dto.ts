export interface CrearUsuarioDto {
  nombre: string;
  correo: string;
}

export interface UsuarioRespuestaDto {
  id: string;
  nombre: string;
  correo: string;
  fechaCreacion: string;
  token: string;
}
