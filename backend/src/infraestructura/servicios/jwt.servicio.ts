import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env['JWT_SECRET'] || 'task-manager-secret-key-change-in-production';
const EXPIRACION = '7d';

export interface PayloadJwt {
  usuarioId: string;
  correo: string;
}

export class JwtServicio {
  static generarToken(payload: PayloadJwt): string {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRACION });
  }

  static verificarToken(token: string): PayloadJwt | null {
    try {
      return jwt.verify(token, SECRET_KEY) as PayloadJwt;
    } catch {
      return null;
    }
  }
}
