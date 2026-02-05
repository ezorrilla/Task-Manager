import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const autenticacion = inject(AuthService);
  const router = inject(Router);

  if (autenticacion.estaAutenticado()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
