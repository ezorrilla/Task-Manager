import * as admin from 'firebase-admin';
import { Usuario } from '../../../dominio/entidades/usuario';
import { CorreoElectronico } from '../../../dominio/value-objects/correo-electronico';
import { RepositorioUsuariosPuerto } from '../../../dominio/puertos/repositorio-usuarios.puerto';
import { ConfiguracionFirebase } from '../configuracion-firebase';

interface UsuarioFirestore {
  id: string;
  nombre: string;
  correo: string;
  fechaCreacion: admin.firestore.Timestamp;
}

export class FirestoreUsuariosRepositorio implements RepositorioUsuariosPuerto {
  private readonly coleccion: admin.firestore.CollectionReference;

  constructor() {
    this.coleccion = ConfiguracionFirebase.obtenerFirestore().collection('usuarios');
  }

  async buscarPorCorreo(correo: string): Promise<Usuario | null> {
    const snapshot = await this.coleccion
      .where('correo', '==', correo.toLowerCase())
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const datos = snapshot.docs[0].data() as UsuarioFirestore;
    return this.mapearAEntidad(datos);
  }

  async buscarPorId(id: string): Promise<Usuario | null> {
    const doc = await this.coleccion.doc(id).get();

    if (!doc.exists) {
      return null;
    }

    const datos = doc.data() as UsuarioFirestore;
    return this.mapearAEntidad(datos);
  }

  async crear(usuario: Usuario): Promise<Usuario> {
    const datosFirestore: UsuarioFirestore = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.obtenerCorreoTexto(),
      fechaCreacion: admin.firestore.Timestamp.fromDate(usuario.fechaCreacion),
    };

    await this.coleccion.doc(usuario.id).set(datosFirestore);

    return usuario;
  }

  private mapearAEntidad(datos: UsuarioFirestore): Usuario {
    return new Usuario({
      id: datos.id,
      nombre: datos.nombre,
      correo: new CorreoElectronico(datos.correo),
      fechaCreacion: datos.fechaCreacion.toDate(),
    });
  }
}
