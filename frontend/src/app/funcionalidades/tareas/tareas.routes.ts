import { Routes } from '@angular/router';

export const TAREAS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./paginas/lista-tareas/lista-tareas.component')
        .then(m => m.ListaTareasComponent)
  }
];
