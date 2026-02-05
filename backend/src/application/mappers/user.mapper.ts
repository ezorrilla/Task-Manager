import { User } from '../../domain/entities/user';
import { UserResponseDto } from '../dtos/create-user.dto';
import { JwtService } from '../../infrastructure/services/jwt.service';

export class UserMapper {
  static toResponseDto(usuario: User): UserResponseDto {
    const token = JwtService.generarToken({
      usuarioId: usuario.id,
      correo: usuario.obtenerCorreoTexto(),
    });

    return {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.obtenerCorreoTexto(),
      fechaCreacion: usuario.fechaCreacion.toISOString(),
      token,
    };
  }
}
