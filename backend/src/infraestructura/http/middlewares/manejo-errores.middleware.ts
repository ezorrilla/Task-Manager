import { Request, Response, NextFunction } from 'express';

export function manejoErroresMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const mensajesConocidos: Record<string, number> = {
    'Tarea no encontrada': 404,
    'El usuario ya existe con este correo': 409,
    'Correo electronico invalido': 400,
    'El titulo de la tarea es obligatorio': 400,
    'El titulo no puede exceder los 100 caracteres': 400,
  };

  const mensaje = error.message;
  const codigoEstado = Object.entries(mensajesConocidos).find(
    ([clave]) => mensaje.includes(clave)
  )?.[1] || 500;

  const respuesta = codigoEstado === 500
    ? { error: 'Error interno del servidor' }
    : { error: mensaje };

  res.status(codigoEstado).json(respuesta);
}
