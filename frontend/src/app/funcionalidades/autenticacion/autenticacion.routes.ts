import { Routes } from '@angular/router';

export const AUTENTICACION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./paginas/inicio-sesion/inicio-sesion.component')
        .then(m => m.InicioSesionComponent)
  }
];
