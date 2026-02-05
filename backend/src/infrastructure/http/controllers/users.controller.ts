import { Request, Response, NextFunction } from 'express';
import { DependencyContainer } from '../../factories/dependency-container';

const contenedor = DependencyContainer.obtenerInstancia();

export class UsersController {
  static async buscar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const correo = req.query['correo'] as string;

      if (!correo) {
        res.status(400).json({ error: 'El parametro correo es obligatorio' });
        return;
      }

      const casoUso = contenedor.obtenerBuscarUsuario();
      const usuario = await casoUso.ejecutar(correo);

      if (!usuario) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      res.json({ datos: usuario });
    } catch (error) {
      next(error);
    }
  }

  static async crear(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const casoUso = contenedor.obtenerCrearUsuario();
      const usuario = await casoUso.ejecutar(req.body);

      res.status(201).json({ datos: usuario });
    } catch (error) {
      next(error);
    }
  }
}
