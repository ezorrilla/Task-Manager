import { Router } from 'express';
import { TareasControlador } from '../controladores/tareas.controlador';
import { autenticacionMiddleware } from '../middlewares/autenticacion.middleware';
import { validarCuerpo } from '../middlewares/validacion.middleware';

const enrutadorTareas = Router();

enrutadorTareas.use(autenticacionMiddleware);

enrutadorTareas.get(
  '/',
  TareasControlador.obtenerTodas
);

enrutadorTareas.post(
  '/',
  validarCuerpo({
    titulo: { requerido: true, tipo: 'string', longitudMaxima: 100 },
    descripcion: { requerido: true, tipo: 'string' },
  }),
  TareasControlador.crear
);

enrutadorTareas.put(
  '/:id',
  TareasControlador.actualizar
);

enrutadorTareas.delete(
  '/:id',
  TareasControlador.eliminar
);

export { enrutadorTareas };
