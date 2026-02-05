import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AutenticacionApiService } from '../../servicios/autenticacion-api.service';
import { AutenticacionService } from '../../../../nucleo/servicios/autenticacion.service';
import { NotificacionService } from '../../../../nucleo/servicios/notificacion.service';
import { CargandoComponent } from '../../../../compartido/componentes/cargando/cargando.component';
import { DialogoRegistroComponent, ResultadoDialogoRegistro } from '../../../../compartido/componentes/dialogo-registro/dialogo-registro.component';
import { validarCorreo } from '../../../../compartido/validadores/correo.validador';

@Component({
  selector: 'app-inicio-sesion',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CargandoComponent
  ],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.scss'
})
export class InicioSesionComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private autenticacionApi = inject(AutenticacionApiService);
  private autenticacion = inject(AutenticacionService);
  private notificacion = inject(NotificacionService);

  formulario = this.fb.group({
    correo: ['', [Validators.required, validarCorreo]]
  });

  cargando = signal(false);

  iniciarSesion(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const correo = this.formulario.value.correo!;
    this.cargando.set(true);

    this.autenticacionApi.buscarPorCorreo(correo).subscribe({
      next: (usuario) => {
        this.cargando.set(false);

        if (usuario) {
          this.autenticacion.iniciarSesion(usuario);
          this.notificacion.exito(`Bienvenido de nuevo, ${usuario.nombre}`);
          this.router.navigate(['/tareas']);
        } else {
          this.mostrarDialogoRegistro(correo);
        }
      },
      error: () => {
        this.cargando.set(false);
      }
    });
  }

  private mostrarDialogoRegistro(correo: string): void {
    const dialogoRef = this.dialog.open(DialogoRegistroComponent, {
      width: '400px',
      data: { correo },
      ariaLabel: 'Registrar nuevo usuario',
      disableClose: true
    });

    dialogoRef.afterClosed().subscribe((resultado: ResultadoDialogoRegistro | null) => {
      if (resultado) {
        this.crearUsuario(resultado);
      }
    });
  }

  private crearUsuario(datos: ResultadoDialogoRegistro): void {
    this.cargando.set(true);

    this.autenticacionApi.crear({ nombre: datos.nombre, correo: datos.correo }).subscribe({
      next: (usuario) => {
        this.cargando.set(false);
        this.autenticacion.iniciarSesion(usuario);
        this.notificacion.exito(`Bienvenido, ${usuario.nombre}`);
        this.router.navigate(['/tareas']);
      },
      error: () => {
        this.cargando.set(false);
      }
    });
  }

  tieneError(campo: string, error: string): boolean {
    const control = this.formulario.get(campo);
    return control ? control.hasError(error) && control.touched : false;
  }
}
