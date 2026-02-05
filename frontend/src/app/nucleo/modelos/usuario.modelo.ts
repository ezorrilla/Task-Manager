export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  fechaCreacion: string;
  token: string;
}

export interface CrearUsuarioDto {
  nombre: string;
  correo: string;
}
