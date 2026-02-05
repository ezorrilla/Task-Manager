import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Tarea } from '../../../../nucleo/modelos/tarea.modelo';
import { FechaRelativaPipe } from '../../../../compartido/pipes/fecha-relativa.pipe';
import { ResaltarCompletadaDirectiva } from '../../../../compartido/directivas/resaltar-completada.directiva';

@Component({
  selector: 'app-tarjeta-tarea',
  imports: [
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FechaRelativaPipe,
    ResaltarCompletadaDirectiva
  ],
  templateUrl: './tarjeta-tarea.component.html',
  styleUrl: './tarjeta-tarea.component.scss'
})
export class TarjetaTareaComponent {
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
