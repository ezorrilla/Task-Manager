import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { Usuario } from '../models/user.model';

describe('AuthService', () => {
  let servicio: AuthService;
  let almacenamientoMock: jasmine.SpyObj<StorageService>;

  const usuarioMock: Usuario = {
    id: 'usuario-123',
    nombre: 'Test Usuario',
    correo: 'test@ejemplo.com',
    fechaCreacion: '2024-01-01T00:00:00.000Z',
    token: 'token-abc-123'
  };

  beforeEach(() => {
    almacenamientoMock = jasmine.createSpyObj('StorageService', [
      'guardarToken',
      'obtenerToken',
      'eliminarToken',
      'guardarUsuario',
      'obtenerUsuario',
      'eliminarUsuario',
      'limpiarSesion'
    ]);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: StorageService, useValue: almacenamientoMock }
      ]
    });

    almacenamientoMock.obtenerUsuario.and.returnValue(null);
    almacenamientoMock.obtenerToken.and.returnValue(null);

    servicio = TestBed.inject(AuthService);
  });

  it('deberia crearse correctamente', () => {
    expect(servicio).toBeTruthy();
  });

  describe('iniciarSesion', () => {
    it('deberia guardar el token y usuario', () => {
      servicio.iniciarSesion(usuarioMock);

      expect(almacenamientoMock.guardarToken).toHaveBeenCalledWith(usuarioMock.token);
      expect(almacenamientoMock.guardarUsuario).toHaveBeenCalledWith(usuarioMock);
    });

    it('deberia actualizar el estado de autenticacion', () => {
      servicio.iniciarSesion(usuarioMock);

      expect(servicio.estaAutenticado()).toBeTrue();
      expect(servicio.correoUsuario()).toBe('test@ejemplo.com');
    });
  });

  describe('cerrarSesion', () => {
    it('deberia limpiar la sesion', () => {
      servicio.iniciarSesion(usuarioMock);
      servicio.cerrarSesion();

      expect(almacenamientoMock.limpiarSesion).toHaveBeenCalled();
      expect(servicio.estaAutenticado()).toBeFalse();
    });
  });

  describe('obtenerToken', () => {
    it('deberia retornar el token del almacenamiento', () => {
      almacenamientoMock.obtenerToken.and.returnValue('token-123');

      const token = servicio.obtenerToken();

      expect(token).toBe('token-123');
    });
  });
});
