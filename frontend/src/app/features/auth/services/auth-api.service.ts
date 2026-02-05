import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { Usuario, CrearUsuarioDto } from '../../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private readonly ruta = '/usuarios';

  constructor(private api: ApiService) {}

  buscarPorCorreo(correo: string): Observable<Usuario | null> {
    return this.api.get<Usuario>(`${this.ruta}/buscar`, { correo }).pipe(
      catchError(() => of(null))
    );
  }

  crear(dto: CrearUsuarioDto): Observable<Usuario> {
    return this.api.post<Usuario>(this.ruta, dto);
  }

  existeUsuario(correo: string): Observable<boolean> {
    return this.buscarPorCorreo(correo).pipe(
      map(usuario => usuario !== null)
    );
  }
}
