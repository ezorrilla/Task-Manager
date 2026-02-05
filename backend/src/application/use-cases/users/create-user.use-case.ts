import { v4 as generarUuid } from 'uuid';
import { User } from '../../../domain/entities/user';
import { Email } from '../../../domain/value-objects/email';
import { UserRepositoryPort } from '../../../domain/ports/user-repository.port';
import { CreateUserDto, UserResponseDto } from '../../dtos/create-user.dto';
import { UserMapper } from '../../mappers/user.mapper';

export class CreateUserUseCase {
  constructor(
    private readonly repositorioUsuarios: UserRepositoryPort
  ) {}

  async ejecutar(dto: CreateUserDto): Promise<UserResponseDto> {
    const correo = new Email(dto.correo);

    const usuarioExistente = await this.repositorioUsuarios.buscarPorCorreo(
      correo.obtenerValor()
    );

    if (usuarioExistente) {
      throw new Error('El usuario ya existe con este correo');
    }

    const nuevoUsuario = new User({
      id: generarUuid(),
      nombre: dto.nombre,
      correo,
      fechaCreacion: new Date(),
    });

    const usuarioCreado = await this.repositorioUsuarios.crear(nuevoUsuario);

    return UserMapper.toResponseDto(usuarioCreado);
  }
}
