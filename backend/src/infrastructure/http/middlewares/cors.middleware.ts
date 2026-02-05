import cors from 'cors';

const origenPermitido = process.env['CORS_ORIGIN'] || 'http://localhost:4200';

export const corsMiddleware = cors({
  origin: origenPermitido,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
