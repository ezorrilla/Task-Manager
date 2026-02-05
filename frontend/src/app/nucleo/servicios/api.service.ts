import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ambiente } from '../../../ambientes/ambiente';
import { RespuestaApi } from '../modelos/respuesta-api.modelo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly urlBase = ambiente.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(ruta: string, parametros?: Record<string, string>): Observable<T> {
    let httpParams = new HttpParams();

    if (parametros) {
      Object.entries(parametros).forEach(([clave, valor]) => {
        httpParams = httpParams.set(clave, valor);
      });
    }

    return this.http
      .get<RespuestaApi<T>>(`${this.urlBase}${ruta}`, { params: httpParams })
      .pipe(map(respuesta => respuesta.datos));
  }

  post<T>(ruta: string, cuerpo: unknown): Observable<T> {
    return this.http
      .post<RespuestaApi<T>>(`${this.urlBase}${ruta}`, cuerpo)
      .pipe(map(respuesta => respuesta.datos));
  }

  put<T>(ruta: string, cuerpo: unknown): Observable<T> {
    return this.http
      .put<RespuestaApi<T>>(`${this.urlBase}${ruta}`, cuerpo)
      .pipe(map(respuesta => respuesta.datos));
  }

  delete(ruta: string): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}${ruta}`);
  }
}
