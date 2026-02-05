import { TestBed } from '@angular/core/testing';
import { AutenticacionService } from './autenticacion.service';
import { AlmacenamientoService } from './almacenamiento.service';
import { Usuario } from '../modelos/usuario.modelo';

describe('AutenticacionService', () => {
  let servicio: AutenticacionService;
  let almacenamientoMock: jasmine.SpyObj<AlmacenamientoService>;

  const usuarioMock: Usuario = {
    id: 'usuario-123',
    correo: 'test@ejemplo.com',
    fechaCreacion: '2024-01-01T00:00:00.000Z',
    token: 'token-abc-123'
  };

  beforeEach(() => {
    almacenamientoMock = jasmine.createSpyObj('AlmacenamientoService', [
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
        AutenticacionService,
        { provide: AlmacenamientoService, useValue: almacenamientoMock }
      ]
    });

    almacenamientoMock.obtenerUsuario.and.returnValue(null);
    almacenamientoMock.obtenerToken.and.returnValue(null);

    servicio = TestBed.inject(AutenticacionService);
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
