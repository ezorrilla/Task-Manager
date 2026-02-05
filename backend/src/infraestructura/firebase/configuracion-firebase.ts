import * as admin from 'firebase-admin';

export class ConfiguracionFirebase {
  private static instancia: admin.app.App;

  private constructor() {}

  static obtenerInstancia(): admin.app.App {
    if (!this.instancia) {
      if (admin.apps.length === 0) {
        this.instancia = admin.initializeApp();
      } else {
        this.instancia = admin.apps[0]!;
      }
    }

    return this.instancia;
  }

  static obtenerFirestore(): admin.firestore.Firestore {
    return this.obtenerInstancia().firestore();
  }
}
