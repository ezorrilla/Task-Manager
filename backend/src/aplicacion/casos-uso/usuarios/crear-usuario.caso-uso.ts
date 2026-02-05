import { v4 as generarUuid } from 'uuid';
import { Usuario } from '../../../dominio/entidades/usuario';
import { CorreoElectronico } from '../../../dominio/value-objects/correo-electronico';
import { RepositorioUsuariosPuerto } from '../../../dominio/puertos/repositorio-usuarios.puerto';
import { CrearUsuarioDto, UsuarioRespuestaDto } from '../../dtos/crear-usuario.dto';
import { UsuarioMapeador } from '../../mapeadores/usuario.mapeador';

export class CrearUsuarioCasoUso {
  constructor(
    private readonly repositorioUsuarios: RepositorioUsuariosPuerto
  ) {}

  async ejecutar(dto: CrearUsuarioDto): Promise<UsuarioRespuestaDto> {
    const correo = new CorreoElectronico(dto.correo);

    const usuarioExistente = await this.repositorioUsuarios.buscarPorCorreo(
      correo.obtenerValor()
    );

    if (usuarioExistente) {
      throw new Error('El usuario ya existe con este correo');
    }

    const nuevoUsuario = new Usuario({
      id: generarUuid(),
      correo,
      fechaCreacion: new Date(),
      token: generarUuid(),
    });

    const usuarioCreado = await this.repositorioUsuarios.crear(nuevoUsuario);

    return UsuarioMapeador.aRespuestaDto(usuarioCreado);
  }
}
