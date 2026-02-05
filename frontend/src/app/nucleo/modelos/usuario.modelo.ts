export interface Usuario {
  id: string;
  correo: string;
  fechaCreacion: string;
  token: string;
}

export interface CrearUsuarioDto {
  correo: string;
}
