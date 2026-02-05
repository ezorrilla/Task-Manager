import * as functions from 'firebase-functions';
import { crearServidor } from './infraestructura/http/servidor';

const app = crearServidor();

export const api = functions.https.onRequest(app);
