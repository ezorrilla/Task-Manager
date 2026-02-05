import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly DURACION_DEFECTO = 3000;

  constructor(private snackBar: MatSnackBar) {}

  exito(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: this.DURACION_DEFECTO,
      panelClass: ['notificacion-exito'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  error(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: this.DURACION_DEFECTO * 2,
      panelClass: ['notificacion-error'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  info(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: this.DURACION_DEFECTO,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
