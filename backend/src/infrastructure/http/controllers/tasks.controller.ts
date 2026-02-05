import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { DependencyContainer } from '../../factories/dependency-container';

const contenedor = DependencyContainer.obtenerInstancia();

export class TasksController {
  static async obtenerTodas(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const casoUso = contenedor.obtenerObtenerTareas();
      const tareas = await casoUso.ejecutar(req.usuarioId!);

      res.json({ datos: tareas });
    } catch (error) {
      next(error);
    }
  }

  static async crear(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const casoUso = contenedor.obtenerCrearTarea();
      const tarea = await casoUso.ejecutar(req.body, req.usuarioId!);

      res.status(201).json({ datos: tarea });
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const casoUso = contenedor.obtenerActualizarTarea();
      const tareaId = req.params['id'] as string;
      const tarea = await casoUso.ejecutar(
        tareaId,
        req.body,
        req.usuarioId!
      );

      res.json({ datos: tarea });
    } catch (error) {
      next(error);
    }
  }

  static async eliminar(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tareaId = req.params['id'] as string;
      const casoUso = contenedor.obtenerEliminarTarea();
      await casoUso.ejecutar(tareaId, req.usuarioId!);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
