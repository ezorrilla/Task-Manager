import { Email } from '../value-objects/email';

export interface UserProperties {
  id: string;
  nombre: string;
  correo: Email;
  fechaCreacion: Date;
}

export class User {
  readonly id: string;
  readonly nombre: string;
  readonly correo: Email;
  readonly fechaCreacion: Date;

  constructor(propiedades: UserProperties) {
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
