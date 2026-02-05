import * as functions from 'firebase-functions';
import { createServer } from './infrastructure/http/server';

const app = createServer();

export const api = functions.https.onRequest(app);
