import express from 'express';
import helmet from 'helmet';
import { corsMiddleware } from './middlewares/cors.middleware';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';
import { usersRouter } from './routes/users.routes';
import { tasksRouter } from './routes/tasks.routes';

export function createServer(): express.Application {
  const app = express();

  app.use(helmet());
  app.use(corsMiddleware);
  app.use(express.json());

  app.use('/api/usuarios', usersRouter);
  app.use('/api/tareas', tasksRouter);

  app.get('/api/salud', (_req, res) => {
    res.json({ estado: 'activo', fecha: new Date().toISOString() });
  });

  app.use(errorHandlerMiddleware);

  return app;
}

if (require.main === module && process.env['NODE_ENV'] !== 'production') {
  const puerto = process.env['PORT'] || 3000;
  const app = createServer();

  app.listen(puerto, () => {
    console.log(`Servidor ejecutandose en puerto ${puerto}`);
  });
}
