import { CreateUserUseCase } from '../../../src/application/use-cases/users/create-user.use-case';
import { UserRepositoryPort } from '../../../src/domain/ports/user-repository.port';
import { User } from '../../../src/domain/entities/user';

describe('CreateUserUseCase', () => {
  let mockRepositorio: jest.Mocked<UserRepositoryPort>;
  let casoUso: CreateUserUseCase;

  beforeEach(() => {
    mockRepositorio = {
      buscarPorCorreo: jest.fn(),
      buscarPorId: jest.fn(),
      crear: jest.fn(),
    };
    casoUso = new CreateUserUseCase(mockRepositorio);
  });

  it('deberia crear un usuario correctamente', async () => {
    mockRepositorio.buscarPorCorreo.mockResolvedValue(null);
    mockRepositorio.crear.mockImplementation(async (usuario: User) => usuario);

    const resultado = await casoUso.ejecutar({ nombre: 'Juan Perez', correo: 'nuevo@ejemplo.com' });

    expect(resultado.correo).toBe('nuevo@ejemplo.com');
    expect(resultado.nombre).toBe('Juan Perez');
    expect(resultado.token).toBeDefined();
    expect(mockRepositorio.crear).toHaveBeenCalledTimes(1);
  });

  it('deberia lanzar error si el usuario ya existe', async () => {
    const usuarioExistente = {
      id: 'existente-123',
    } as unknown as User;

    mockRepositorio.buscarPorCorreo.mockResolvedValue(usuarioExistente);

    await expect(
      casoUso.ejecutar({ nombre: 'Juan Perez', correo: 'existente@ejemplo.com' })
    ).rejects.toThrow('El usuario ya existe con este correo');
  });

  it('deberia lanzar error para correo invalido', async () => {
    await expect(
      casoUso.ejecutar({ nombre: 'Juan Perez', correo: 'correo-invalido' })
    ).rejects.toThrow('Correo electronico invalido');
  });

  it('deberia lanzar error para nombre muy corto', async () => {
    await expect(
      casoUso.ejecutar({ nombre: 'J', correo: 'valido@ejemplo.com' })
    ).rejects.toThrow('El nombre debe tener al menos 2 caracteres');
  });
});
