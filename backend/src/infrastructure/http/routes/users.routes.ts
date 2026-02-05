import { Router } from 'express';
import { UsersController } from '../controllers/users.controller';
import { validateBody } from '../middlewares/validation.middleware';

const usersRouter = Router();

usersRouter.get(
  '/buscar',
  UsersController.buscar
);

usersRouter.post(
  '/',
  validateBody({
    nombre: { requerido: true, tipo: 'string', longitudMinima: 2 },
    correo: { requerido: true, tipo: 'string' },
  }),
  UsersController.crear
);

export { usersRouter };
