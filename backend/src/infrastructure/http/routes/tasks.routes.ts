import { Router } from 'express';
import { TasksController } from '../controllers/tasks.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validation.middleware';

const tasksRouter = Router();

tasksRouter.use(authMiddleware);

tasksRouter.get(
  '/',
  TasksController.obtenerTodas
);

tasksRouter.post(
  '/',
  validateBody({
    titulo: { requerido: true, tipo: 'string', longitudMaxima: 100 },
    descripcion: { requerido: true, tipo: 'string' },
  }),
  TasksController.crear
);

tasksRouter.put(
  '/:id',
  TasksController.actualizar
);

tasksRouter.delete(
  '/:id',
  TasksController.eliminar
);

export { tasksRouter };
