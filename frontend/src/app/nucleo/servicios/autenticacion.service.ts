import { Injectable, signal, computed } from '@angular/core';
import { Usuario } from '../modelos/usuario.modelo';
import { AlmacenamientoService } from './almacenamiento.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private usuarioActual = signal<Usuario | null>(null);

  readonly usuario = this.usuarioActual.asReadonly();
  readonly estaAutenticado = computed(() => this.usuarioActual() !== null);
  readonly correoUsuario = computed(() => this.usuarioActual()?.correo ?? '');

  constructor(private almacenamiento: AlmacenamientoService) {
    this.restaurarSesion();
  }

  private restaurarSesion(): void {
    const usuario = this.almacenamiento.obtenerUsuario<Usuario>();
    const token = this.almacenamiento.obtenerToken();

    if (usuario && token) {
      this.usuarioActual.set(usuario);
    }
  }

  iniciarSesion(usuario: Usuario): void {
    this.almacenamiento.guardarToken(usuario.token);
    this.almacenamiento.guardarUsuario(usuario);
    this.usuarioActual.set(usuario);
  }

  cerrarSesion(): void {
    this.almacenamiento.limpiarSesion();
    this.usuarioActual.set(null);
  }

  obtenerToken(): string | null {
    return this.almacenamiento.obtenerToken();
  }
}
