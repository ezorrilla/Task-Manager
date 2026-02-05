export interface PropiedadesTarea {
  id: string;
  titulo: string;
  descripcion: string;
  completada: boolean;
  fechaCreacion: Date;
  usuarioId: string;
}

export class Tarea {
  readonly id: string;
  private _titulo: string;
  private _descripcion: string;
  private _completada: boolean;
  readonly fechaCreacion: Date;
  readonly usuarioId: string;

  constructor(propiedades: PropiedadesTarea) {
    this.validarTitulo(propiedades.titulo);
    this.id = propiedades.id;
    this._titulo = propiedades.titulo.trim();
    this._descripcion = propiedades.descripcion.trim();
    this._completada = propiedades.completada;
    this.fechaCreacion = propiedades.fechaCreacion;
    this.usuarioId = propiedades.usuarioId;
  }

  get titulo(): string {
    return this._titulo;
  }

  get descripcion(): string {
    return this._descripcion;
  }

  get completada(): boolean {
    return this._completada;
  }

  actualizarTitulo(titulo: string): void {
    this.validarTitulo(titulo);
    this._titulo = titulo.trim();
  }

  actualizarDescripcion(descripcion: string): void {
    this._descripcion = descripcion.trim();
  }

  marcarComoCompletada(): void {
    this._completada = true;
  }

  marcarComoPendiente(): void {
    this._completada = false;
  }

  alternarEstado(): void {
    this._completada = !this._completada;
  }

  private validarTitulo(titulo: string): void {
    if (!titulo || titulo.trim().length === 0) {
      throw new Error('El titulo de la tarea es obligatorio');
    }

    if (titulo.trim().length > 100) {
      throw new Error('El titulo no puede exceder los 100 caracteres');
    }
  }
}
