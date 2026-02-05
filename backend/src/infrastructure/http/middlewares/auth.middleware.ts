import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../../services/jwt.service';

export interface AuthenticatedRequest extends Request {
  usuarioId?: string;
  correoUsuario?: string;
}

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const cabecera = req.headers.authorization;

  if (!cabecera || !cabecera.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'No autorizado',
      mensaje: 'Token de autenticacion requerido'
    });
    return;
  }

  const token = cabecera.split(' ')[1];

  if (!token) {
    res.status(401).json({
      error: 'No autorizado',
      mensaje: 'Token invalido'
    });
    return;
  }

  const payload = JwtService.verificarToken(token);

  if (!payload) {
    res.status(401).json({
      error: 'No autorizado',
      mensaje: 'Token expirado o invalido'
    });
    return;
  }

  req.usuarioId = payload.usuarioId;
  req.correoUsuario = payload.correo;
  next();
}
