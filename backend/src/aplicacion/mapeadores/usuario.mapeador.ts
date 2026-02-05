import { Usuario } from '../../dominio/entidades/usuario';
import { UsuarioRespuestaDto } from '../dtos/crear-usuario.dto';
import { JwtServicio } from '../../infraestructura/servicios/jwt.servicio';

export class UsuarioMapeador {
  static aRespuestaDto(usuario: Usuario): UsuarioRespuestaDto {
    const token = JwtServicio.generarToken({
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
