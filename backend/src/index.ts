import * as functions from 'firebase-functions/v1';
import { createServer } from './infrastructure/http/server';

const app = createServer();

export const api = functions.https.onRequest(app);
