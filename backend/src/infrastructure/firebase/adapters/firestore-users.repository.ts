import * as admin from 'firebase-admin';
import { User } from '../../../domain/entities/user';
import { Email } from '../../../domain/value-objects/email';
import { UserRepositoryPort } from '../../../domain/ports/user-repository.port';
import { FirebaseConfig } from '../firebase-config';

interface UserFirestore {
  id: string;
  nombre: string;
  correo: string;
  fechaCreacion: admin.firestore.Timestamp;
}

export class FirestoreUsersRepository implements UserRepositoryPort {
  private readonly coleccion: admin.firestore.CollectionReference;

  constructor() {
    this.coleccion = FirebaseConfig.obtenerFirestore().collection('usuarios');
  }

  async buscarPorCorreo(correo: string): Promise<User | null> {
    const snapshot = await this.coleccion
      .where('correo', '==', correo.toLowerCase())
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const datos = snapshot.docs[0].data() as UserFirestore;
    return this.mapearAEntidad(datos);
  }

  async buscarPorId(id: string): Promise<User | null> {
    const doc = await this.coleccion.doc(id).get();

    if (!doc.exists) {
      return null;
    }

    const datos = doc.data() as UserFirestore;
    return this.mapearAEntidad(datos);
  }

  async crear(usuario: User): Promise<User> {
    const datosFirestore: UserFirestore = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.obtenerCorreoTexto(),
      fechaCreacion: admin.firestore.Timestamp.fromDate(usuario.fechaCreacion),
    };

    await this.coleccion.doc(usuario.id).set(datosFirestore);

    return usuario;
  }

  private mapearAEntidad(datos: UserFirestore): User {
    return new User({
      id: datos.id,
      nombre: datos.nombre,
      correo: new Email(datos.correo),
      fechaCreacion: datos.fechaCreacion.toDate(),
    });
  }
}
