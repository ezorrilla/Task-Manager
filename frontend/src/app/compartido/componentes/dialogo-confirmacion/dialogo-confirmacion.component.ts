import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DatosDialogoConfirmacion {
  titulo: string;
  mensaje: string;
  textoConfirmar?: string;
  textoCancelar?: string;
}

@Component({
  selector: 'app-dialogo-confirmacion',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialogo-confirmacion.component.html',
  styleUrl: './dialogo-confirmacion.component.scss'
})
export class DialogoConfirmacionComponent {
  private dialogoRef = inject(MatDialogRef<DialogoConfirmacionComponent>);
  datos = inject<DatosDialogoConfirmacion>(MAT_DIALOG_DATA);

  confirmar(): void {
    this.dialogoRef.close(true);
  }

  cancelar(): void {
    this.dialogoRef.close(false);
  }
}
