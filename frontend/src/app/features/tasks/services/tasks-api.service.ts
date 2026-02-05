import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Tarea, CrearTareaDto, ActualizarTareaDto } from '../../../core/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksApiService {
  private readonly ruta = '/tareas';

  constructor(private api: ApiService) {}

  obtenerTodas(): Observable<Tarea[]> {
    return this.api.get<Tarea[]>(this.ruta);
  }

  crear(dto: CrearTareaDto): Observable<Tarea> {
    return this.api.post<Tarea>(this.ruta, dto);
  }

  actualizar(id: string, dto: ActualizarTareaDto): Observable<Tarea> {
    return this.api.put<Tarea>(`${this.ruta}/${id}`, dto);
  }

  eliminar(id: string): Observable<void> {
    return this.api.delete(`${this.ruta}/${id}`);
  }

  cambiarEstado(id: string, completada: boolean): Observable<Tarea> {
    return this.actualizar(id, { completada });
  }
}
