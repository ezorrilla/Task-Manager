import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Tarea, ActualizarTareaDto } from '../../../../nucleo/modelos/tarea.modelo';

@Component({
  selector: 'app-dialogo-editar-tarea',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './dialogo-editar-tarea.component.html',
  styleUrl: './dialogo-editar-tarea.component.scss'
})
export class DialogoEditarTareaComponent {
  private fb = inject(FormBuilder);
  private dialogoRef = inject(MatDialogRef<DialogoEditarTareaComponent>);
  tarea = inject<Tarea>(MAT_DIALOG_DATA);

  formulario = this.fb.group({
    titulo: [this.tarea.titulo, [Validators.required, Validators.maxLength(100)]],
    descripcion: [this.tarea.descripcion, [Validators.required]]
  });

  guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const datosActualizados: ActualizarTareaDto = {
      titulo: this.formulario.value.titulo!,
      descripcion: this.formulario.value.descripcion!
    };

    this.dialogoRef.close(datosActualizados);
  }

  cancelar(): void {
    this.dialogoRef.close(null);
  }

  tieneError(campo: string, error: string): boolean {
    const control = this.formulario.get(campo);
    return control ? control.hasError(error) && control.touched : false;
  }
}
