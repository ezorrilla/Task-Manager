import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmationDialogData {
  titulo: string;
  mensaje: string;
  textoConfirmar?: string;
  textoCancelar?: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  private dialogoRef = inject(MatDialogRef<ConfirmationDialogComponent>);
  datos = inject<ConfirmationDialogData>(MAT_DIALOG_DATA);

  confirmar(): void {
    this.dialogoRef.close(true);
  }

  cancelar(): void {
    this.dialogoRef.close(false);
  }
}
