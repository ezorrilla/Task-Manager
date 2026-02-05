import { Usuario } from '../entidades/usuario';

export interface RepositorioUsuariosPuerto {
  buscarPorCorreo(correo: string): Promise<Usuario | null>;
  buscarPorId(id: string): Promise<Usuario | null>;
  crear(usuario: Usuario): Promise<Usuario>;
}
