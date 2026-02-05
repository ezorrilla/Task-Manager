import { Request, Response, NextFunction } from 'express';
import { ConfiguracionFirebase } from '../../firebase/configuracion-firebase';

export interface RequestAutenticado extends Request {
  usuarioId?: string;
}

export async function autenticacionMiddleware(
  req: RequestAutenticado,
  res: Response,
  next: NextFunction
): Promise<void> {
  const cabecera = req.headers.authorization;

  if (!cabecera || !cabecera.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token de autenticacion requerido' });
    return;
  }

  const token = cabecera.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Token invalido' });
    return;
  }

  const firestore = ConfiguracionFirebase.obtenerFirestore();
  const snapshot = await firestore
    .collection('usuarios')
    .where('token', '==', token)
    .limit(1)
    .get();

  if (snapshot.empty) {
    res.status(401).json({ error: 'Token no autorizado' });
    return;
  }

  req.usuarioId = snapshot.docs[0].data().id;
  next();
}
