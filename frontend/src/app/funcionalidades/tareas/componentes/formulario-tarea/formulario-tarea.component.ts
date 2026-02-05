import { Component, output, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CrearTareaDto } from '../../../../nucleo/modelos/tarea.modelo';

@Component({
  selector: 'app-formulario-tarea',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './formulario-tarea.component.html',
  styleUrl: './formulario-tarea.component.scss'
})
export class FormularioTareaComponent {
  private fb = inject(FormBuilder);

  tareaCreada = output<CrearTareaDto>();

  formulario = this.fb.group({
    titulo: ['', [Validators.required, Validators.maxLength(100)]],
    descripcion: ['', [Validators.required]]
  });

  enviando = signal(false);

  enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const tarea: CrearTareaDto = {
      titulo: this.formulario.value.titulo!,
      descripcion: this.formulario.value.descripcion!
    };

    this.tareaCreada.emit(tarea);
    this.formulario.reset();
  }

  tieneError(campo: string, error: string): boolean {
    const control = this.formulario.get(campo);
    return control ? control.hasError(error) && control.touched : false;
  }
}
