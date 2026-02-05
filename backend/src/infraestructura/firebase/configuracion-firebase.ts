import * as admin from 'firebase-admin';

export class ConfiguracionFirebase {
  private static instancia: admin.app.App;

  private constructor() {}

  static obtenerInstancia(): admin.app.App {
    if (!this.instancia) {
      this.instancia = admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    }

    return this.instancia;
  }

  static obtenerFirestore(): admin.firestore.Firestore {
    return this.obtenerInstancia().firestore();
  }
}
