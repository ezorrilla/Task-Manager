import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env['JWT_SECRET'] || 'task-manager-secret-key-change-in-production';
const EXPIRACION = '1d';

export interface JwtPayload {
  usuarioId: string;
  correo: string;
}

export class JwtService {
  static generarToken(payload: JwtPayload): string {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRACION });
  }

  static verificarToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, SECRET_KEY) as JwtPayload;
    } catch {
      return null;
    }
  }
}
