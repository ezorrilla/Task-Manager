import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const autenticacionService = inject(AutenticacionService);
  const token = autenticacionService.obtenerToken();

  if (token && !req.url.includes('/usuarios')) {
    const reqClonada = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(reqClonada);
  }

  return next(req);
};
