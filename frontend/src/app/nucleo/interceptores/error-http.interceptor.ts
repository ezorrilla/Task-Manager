import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NotificacionService } from '../servicios/notificacion.service';
import { AutenticacionService } from '../servicios/autenticacion.service';

export const errorHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const notificacion = inject(NotificacionService);
  const autenticacion = inject(AutenticacionService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let mensaje = 'Ha ocurrido un error inesperado';

      if (error.status === 401) {
        autenticacion.cerrarSesion();
        router.navigate(['/']);
        mensaje = 'Sesion expirada. Por favor, inicie sesion nuevamente';
      } else if (error.status === 404) {
        mensaje = error.error?.error || 'Recurso no encontrado';
      } else if (error.status === 400) {
        mensaje = error.error?.error || 'Datos invalidos';
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
