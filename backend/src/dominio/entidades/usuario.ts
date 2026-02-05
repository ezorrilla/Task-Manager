import { CorreoElectronico } from '../value-objects/correo-electronico';

export interface PropiedadesUsuario {
  id: string;
  nombre: string;
  correo: CorreoElectronico;
  fechaCreacion: Date;
}

export class Usuario {
  readonly id: string;
  readonly nombre: string;
  readonly correo: CorreoElectronico;
  readonly fechaCreacion: Date;

  constructor(propiedades: PropiedadesUsuario) {
    this.validarNombre(propiedades.nombre);
    this.id = propiedades.id;
    this.nombre = propiedades.nombre.trim();
    this.correo = propiedades.correo;
    this.fechaCreacion = propiedades.fechaCreacion;
  }

  private validarNombre(nombre: string): void {
    if (!nombre || nombre.trim().length < 2) {
      throw new Error('El nombre debe tener al menos 2 caracteres');
    }
  }

  obtenerCorreoTexto(): string {
    return this.correo.obtenerValor();
  }
}
