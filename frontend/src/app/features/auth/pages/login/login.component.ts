import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthApiService } from '../../services/auth-api.service';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { RegistrationDialogComponent, RegistrationDialogResult } from '../../../../shared/components/registration-dialog/registration-dialog.component';
import { validateEmail } from '../../../../shared/validators/email.validator';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    LoadingComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private autenticacionApi = inject(AuthApiService);
  private autenticacion = inject(AuthService);
  private notificacion = inject(NotificationService);

  formulario = this.fb.group({
    correo: ['', [Validators.required, validateEmail]]
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
    const dialogoRef = this.dialog.open(RegistrationDialogComponent, {
      width: '400px',
      data: { correo },
      ariaLabel: 'Registrar nuevo usuario',
      disableClose: true
    });

    dialogoRef.afterClosed().subscribe((resultado: RegistrationDialogResult | null) => {
      if (resultado) {
        this.crearUsuario(resultado);
      }
    });
  }

  private crearUsuario(datos: RegistrationDialogResult): void {
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
