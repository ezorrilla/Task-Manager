import { CrearUsuarioCasoUso } from '../../../src/aplicacion/casos-uso/usuarios/crear-usuario.caso-uso';
import { RepositorioUsuariosPuerto } from '../../../src/dominio/puertos/repositorio-usuarios.puerto';
import { Usuario } from '../../../src/dominio/entidades/usuario';

describe('CrearUsuarioCasoUso', () => {
  let mockRepositorio: jest.Mocked<RepositorioUsuariosPuerto>;
  let casoUso: CrearUsuarioCasoUso;

  beforeEach(() => {
    mockRepositorio = {
      buscarPorCorreo: jest.fn(),
      buscarPorToken: jest.fn(),
      crear: jest.fn(),
    };
    casoUso = new CrearUsuarioCasoUso(mockRepositorio);
  });

  it('deberia crear un usuario correctamente', async () => {
    mockRepositorio.buscarPorCorreo.mockResolvedValue(null);
    mockRepositorio.crear.mockImplementation(async (usuario: Usuario) => usuario);

    const resultado = await casoUso.ejecutar({ correo: 'nuevo@ejemplo.com' });

    expect(resultado.correo).toBe('nuevo@ejemplo.com');
    expect(resultado.token).toBeDefined();
    expect(mockRepositorio.crear).toHaveBeenCalledTimes(1);
  });

  it('deberia lanzar error si el usuario ya existe', async () => {
    const usuarioExistente = {
      id: 'existente-123',
    } as unknown as Usuario;

    mockRepositorio.buscarPorCorreo.mockResolvedValue(usuarioExistente);

    await expect(
      casoUso.ejecutar({ correo: 'existente@ejemplo.com' })
    ).rejects.toThrow('El usuario ya existe con este correo');
  });

  it('deberia lanzar error para correo invalido', async () => {
    await expect(
      casoUso.ejecutar({ correo: 'correo-invalido' })
    ).rejects.toThrow('Correo electronico invalido');
  });
});
