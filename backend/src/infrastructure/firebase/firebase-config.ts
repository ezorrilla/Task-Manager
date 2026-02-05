import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

export class FirebaseConfig {
  private static instancia: admin.app.App;

  private constructor() {}

  static obtenerInstancia(): admin.app.App {
    if (!this.instancia) {
      if (admin.apps.length > 0) {
        this.instancia = admin.apps[0]!;
        return this.instancia;
      }

      const rutaCredenciales = path.join(process.cwd(), 'firebase-credentials.json');

      if (fs.existsSync(rutaCredenciales)) {
        const credenciales = JSON.parse(fs.readFileSync(rutaCredenciales, 'utf8'));
        this.instancia = admin.initializeApp({
          credential: admin.credential.cert(credenciales),
          projectId: credenciales.project_id,
        });
      } else if (process.env['GOOGLE_APPLICATION_CREDENTIALS']) {
        this.instancia = admin.initializeApp();
      } else {
        this.instancia = admin.initializeApp();
      }
    }

    return this.instancia;
  }

  static obtenerFirestore(): admin.firestore.Firestore {
    return this.obtenerInstancia().firestore();
  }
}
