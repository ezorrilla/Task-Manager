import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Tarea } from '../../../../core/models/task.model';
import { RelativeDatePipe } from '../../../../shared/pipes/relative-date.pipe';
import { HighlightCompletedDirective } from '../../../../shared/directives/highlight-completed.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RelativeDatePipe,
    HighlightCompletedDirective
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  tarea = input.required<Tarea>();

  estadoCambiado = output<{ id: string; completada: boolean }>();
  editar = output<Tarea>();
  eliminar = output<string>();

  cambiarEstado(completada: boolean): void {
    this.estadoCambiado.emit({
      id: this.tarea().id,
      completada
    });
  }

  solicitarEdicion(): void {
    this.editar.emit(this.tarea());
  }

  solicitarEliminacion(): void {
    this.eliminar.emit(this.tarea().id);
  }
}
