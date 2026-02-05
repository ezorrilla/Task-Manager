import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly CLAVE_TOKEN = 'auth_token';
  private readonly CLAVE_USUARIO = 'usuario_actual';

  guardarToken(token: string): void {
    localStorage.setItem(this.CLAVE_TOKEN, token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem(this.CLAVE_TOKEN);
  }

  eliminarToken(): void {
    localStorage.removeItem(this.CLAVE_TOKEN);
  }

  guardarUsuario(usuario: object): void {
    localStorage.setItem(this.CLAVE_USUARIO, JSON.stringify(usuario));
  }

  obtenerUsuario<T>(): T | null {
    const datos = localStorage.getItem(this.CLAVE_USUARIO);
    return datos ? JSON.parse(datos) : null;
  }

  eliminarUsuario(): void {
    localStorage.removeItem(this.CLAVE_USUARIO);
  }

  limpiarSesion(): void {
    this.eliminarToken();
    this.eliminarUsuario();
  }
}
