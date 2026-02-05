import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';

export const autenticacionGuard: CanActivateFn = () => {
  const autenticacion = inject(AutenticacionService);
  const router = inject(Router);

  if (autenticacion.estaAutenticado()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
