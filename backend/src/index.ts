import { onRequest } from 'firebase-functions/v2/https';
import { createServer } from './infrastructure/http/server';

const app = createServer();

export const api = onRequest(app);
