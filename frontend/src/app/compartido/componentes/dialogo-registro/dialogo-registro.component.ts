import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

export interface DatosDialogoRegistro {
  correo: string;
}

export interface ResultadoDialogoRegistro {
  nombre: string;
  correo: string;
}

@Component({
  selector: 'app-dialogo-registro',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './dialogo-registro.component.html',
  styleUrl: './dialogo-registro.component.scss'
})
export class DialogoRegistroComponent {
  private fb = inject(FormBuilder);
  private dialogoRef = inject(MatDialogRef<DialogoRegistroComponent>);
  datos = inject<DatosDialogoRegistro>(MAT_DIALOG_DATA);

  formulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]]
  });

  confirmar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const resultado: ResultadoDialogoRegistro = {
      nombre: this.formulario.value.nombre!,
      correo: this.datos.correo
    };

    this.dialogoRef.close(resultado);
  }

  cancelar(): void {
    this.dialogoRef.close(null);
  }

  tieneError(campo: string, error: string): boolean {
    const control = this.formulario.get(campo);
    return control ? control.hasError(error) && control.touched : false;
  }
}
