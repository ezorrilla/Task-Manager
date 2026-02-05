import { Routes } from '@angular/router';
import { autenticacionGuard } from './nucleo/guardias/autenticacion.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./funcionalidades/autenticacion/autenticacion.routes')
        .then(m => m.AUTENTICACION_ROUTES)
  },
  {
    path: 'tareas',
    loadChildren: () =>
      import('./funcionalidades/tareas/tareas.routes')
        .then(m => m.TAREAS_ROUTES),
    canActivate: [autenticacionGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
