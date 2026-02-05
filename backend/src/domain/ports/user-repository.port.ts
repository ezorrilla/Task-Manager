import { User } from '../entities/user';

export interface UserRepositoryPort {
  buscarPorCorreo(correo: string): Promise<User | null>;
  buscarPorId(id: string): Promise<User | null>;
  crear(usuario: User): Promise<User>;
}
