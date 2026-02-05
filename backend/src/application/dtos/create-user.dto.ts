export interface CreateUserDto {
  nombre: string;
  correo: string;
}

export interface UserResponseDto {
  id: string;
  nombre: string;
  correo: string;
  fechaCreacion: string;
  token: string;
}
