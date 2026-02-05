import { RepositorioUsuariosPuerto } from '../../../dominio/puertos/repositorio-usuarios.puerto';
import { UsuarioRespuestaDto } from '../../dtos/crear-usuario.dto';
import { UsuarioMapeador } from '../../mapeadores/usuario.mapeador';

export class BuscarUsuarioCasoUso {
  constructor(
    private readonly repositorioUsuarios: RepositorioUsuariosPuerto
  ) {}

  async ejecutar(correo: string): Promise<UsuarioRespuestaDto | null> {
    const usuario = await this.repositorioUsuarios.buscarPorCorreo(correo);

    if (!usuario) {
      return null;
    }

    return UsuarioMapeador.aRespuestaDto(usuario);
  }
}
