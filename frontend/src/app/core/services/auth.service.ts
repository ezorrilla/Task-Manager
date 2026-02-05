import { Injectable, signal, computed } from '@angular/core';
import { Usuario } from '../models/user.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActual = signal<Usuario | null>(null);

  readonly usuario = this.usuarioActual.asReadonly();
  readonly estaAutenticado = computed(() => this.usuarioActual() !== null);
  readonly nombreUsuario = computed(() => this.usuarioActual()?.nombre ?? '');
  readonly correoUsuario = computed(() => this.usuarioActual()?.correo ?? '');

  constructor(private almacenamiento: StorageService) {
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
