import express from 'express';
import helmet from 'helmet';
import { corsMiddleware } from './middlewares/cors.middleware';
import { manejoErroresMiddleware } from './middlewares/manejo-errores.middleware';
import { enrutadorUsuarios } from './rutas/usuarios.rutas';
import { enrutadorTareas } from './rutas/tareas.rutas';

export function crearServidor(): express.Application {
  const app = express();

  app.use(helmet());
  app.use(corsMiddleware);
  app.use(express.json());

  app.use('/api/usuarios', enrutadorUsuarios);
  app.use('/api/tareas', enrutadorTareas);

  app.get('/api/salud', (_req, res) => {
    res.json({ estado: 'activo', fecha: new Date().toISOString() });
  });

  app.use(manejoErroresMiddleware);

  return app;
}

if (process.env['NODE_ENV'] !== 'production') {
  const puerto = process.env['PORT'] || 3000;
  const app = crearServidor();

  app.listen(puerto, () => {
    console.log(`Servidor ejecutandose en puerto ${puerto}`);
  });
}
