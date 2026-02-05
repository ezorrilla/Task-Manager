import { CorreoElectronico } from '../value-objects/correo-electronico';

export interface PropiedadesUsuario {
  id: string;
  correo: CorreoElectronico;
  fechaCreacion: Date;
  token: string;
}

export class Usuario {
  readonly id: string;
  readonly correo: CorreoElectronico;
  readonly fechaCreacion: Date;
  readonly token: string;

  constructor(propiedades: PropiedadesUsuario) {
    this.id = propiedades.id;
    this.correo = propiedades.correo;
    this.fechaCreacion = propiedades.fechaCreacion;
    this.token = propiedades.token;
  }

  obtenerCorreoTexto(): string {
    return this.correo.obtenerValor();
  }
}
