import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';

export const errorHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const notificacion = inject(NotificationService);
  const autenticacion = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let mensaje = 'Ha ocurrido un error inesperado';

      if (error.status === 401) {
        autenticacion.cerrarSesion();
        router.navigate(['/']);
        mensaje = 'Sesión expirada. Por favor, inicie sesión nuevamente';
      } else if (error.status === 404) {
        mensaje = error.error?.error || 'Recurso no encontrado';
      } else if (error.status === 400) {
        mensaje = error.error?.error || 'Datos inválidos';
      } else if (error.status === 409) {
        mensaje = error.error?.error || 'El recurso ya existe';
      } else if (error.status === 0) {
        mensaje = 'No se pudo conectar con el servidor';
      }

      notificacion.error(mensaje);
      return throwError(() => error);
    })
  );
};
