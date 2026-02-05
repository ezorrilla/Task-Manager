import { Request, Response, NextFunction } from 'express';

type ValidationRules = {
  [campo: string]: {
    requerido?: boolean;
    tipo?: string;
    longitudMaxima?: number;
    longitudMinima?: number;
  };
};

export function validateBody(reglas: ValidationRules) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errores: string[] = [];

    for (const [campo, regla] of Object.entries(reglas)) {
      const valor = req.body[campo];

      if (regla.requerido && (valor === undefined || valor === null || valor === '')) {
        errores.push(`El campo '${campo}' es obligatorio`);
        continue;
      }

      if (valor !== undefined && valor !== null) {
        if (regla.tipo && typeof valor !== regla.tipo) {
          errores.push(`El campo '${campo}' debe ser de tipo ${regla.tipo}`);
        }

        if (regla.longitudMaxima && typeof valor === 'string' && valor.length > regla.longitudMaxima) {
          errores.push(`El campo '${campo}' no puede exceder ${regla.longitudMaxima} caracteres`);
        }

        if (regla.longitudMinima && typeof valor === 'string' && valor.trim().length < regla.longitudMinima) {
          errores.push(`El campo '${campo}' debe tener al menos ${regla.longitudMinima} caracteres`);
        }
      }
    }

    if (errores.length > 0) {
      res.status(400).json({ error: 'Errores de validacion', detalles: errores });
      return;
    }

    next();
  };
}
