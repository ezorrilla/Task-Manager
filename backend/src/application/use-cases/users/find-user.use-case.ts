import { UserRepositoryPort } from '../../../domain/ports/user-repository.port';
import { UserResponseDto } from '../../dtos/create-user.dto';
import { UserMapper } from '../../mappers/user.mapper';

export class FindUserUseCase {
  constructor(
    private readonly repositorioUsuarios: UserRepositoryPort
  ) {}

  async ejecutar(correo: string): Promise<UserResponseDto | null> {
    const usuario = await this.repositorioUsuarios.buscarPorCorreo(correo);

    if (!usuario) {
      return null;
    }

    return UserMapper.toResponseDto(usuario);
  }
}
