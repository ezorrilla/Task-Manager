import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TasksApiService } from '../../services/tasks-api.service';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Tarea, CrearTareaDto, ActualizarTareaDto } from '../../../../core/models/task.model';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { TaskEditDialogComponent } from '../../components/task-edit-dialog/task-edit-dialog.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-task-list',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    TaskFormComponent,
    TaskCardComponent,
    LoadingComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private tareasApi = inject(TasksApiService);
  private autenticacion = inject(AuthService);
  private notificacion = inject(NotificationService);

  tareas = signal<Tarea[]>([]);
  cargando = signal(true);

  nombreUsuario = this.autenticacion.nombreUsuario;

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.cargando.set(true);
    this.tareasApi.obtenerTodas().subscribe({
      next: (tareas) => {
        this.tareas.set(tareas);
        this.cargando.set(false);
      },
      error: () => {
        this.cargando.set(false);
      }
    });
  }

  agregarTarea(dto: CrearTareaDto): void {
    this.tareasApi.crear(dto).subscribe({
      next: (tarea) => {
        this.tareas.update(lista => [tarea, ...lista]);
        this.notificacion.exito('Tarea creada exitosamente');
      }
    });
  }

  cambiarEstado(evento: { id: string; completada: boolean }): void {
    this.tareasApi.cambiarEstado(evento.id, evento.completada).subscribe({
      next: (tareaActualizada) => {
        this.tareas.update(lista =>
          lista.map(t => t.id === tareaActualizada.id ? tareaActualizada : t)
        );
        const mensaje = evento.completada ? 'Tarea completada' : 'Tarea marcada como pendiente';
        this.notificacion.info(mensaje);
      }
    });
  }

  editarTarea(tarea: Tarea): void {
    const dialogoRef = this.dialog.open(TaskEditDialogComponent, {
      width: '500px',
      data: tarea,
      ariaLabel: 'Editar tarea'
    });

    dialogoRef.afterClosed().subscribe((resultado: ActualizarTareaDto | null) => {
      if (resultado) {
        this.actualizarTarea(tarea.id, resultado);
      }
    });
  }

  private actualizarTarea(id: string, dto: ActualizarTareaDto): void {
    this.tareasApi.actualizar(id, dto).subscribe({
      next: (tareaActualizada) => {
        this.tareas.update(lista =>
          lista.map(t => t.id === tareaActualizada.id ? tareaActualizada : t)
        );
        this.notificacion.exito('Tarea actualizada');
      }
    });
  }

  confirmarEliminacion(id: string): void {
    const datos: ConfirmationDialogData = {
      titulo: 'Eliminar tarea',
      mensaje: '¿Esta seguro de que desea eliminar esta tarea? Esta accion no se puede deshacer.',
      textoConfirmar: 'Eliminar',
      textoCancelar: 'Cancelar'
    };

    const dialogoRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: datos
    });

    dialogoRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.eliminarTarea(id);
      }
    });
  }

  private eliminarTarea(id: string): void {
    this.tareasApi.eliminar(id).subscribe({
      next: () => {
        this.tareas.update(lista => lista.filter(t => t.id !== id));
        this.notificacion.exito('Tarea eliminada');
      }
    });
  }

  cerrarSesion(): void {
    this.autenticacion.cerrarSesion();
    this.router.navigate(['/']);
  }

  identificarTarea(_index: number, tarea: Tarea): string {
    return tarea.id;
  }
}
