import { Usuario } from '../../dominio/entidades/usuario';
import { UsuarioRespuestaDto } from '../dtos/crear-usuario.dto';

export class UsuarioMapeador {
  static aRespuestaDto(usuario: Usuario): UsuarioRespuestaDto {
    return {
      id: usuario.id,
      correo: usuario.obtenerCorreoTexto(),
      fechaCreacion: usuario.fechaCreacion.toISOString(),
      token: usuario.token,
    };
  }
}
