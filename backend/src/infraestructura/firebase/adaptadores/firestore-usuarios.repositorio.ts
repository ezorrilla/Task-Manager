import * as admin from 'firebase-admin';
import { Usuario } from '../../../dominio/entidades/usuario';
import { CorreoElectronico } from '../../../dominio/value-objects/correo-electronico';
import { RepositorioUsuariosPuerto } from '../../../dominio/puertos/repositorio-usuarios.puerto';
import { ConfiguracionFirebase } from '../configuracion-firebase';

interface UsuarioFirestore {
  id: string;
  correo: string;
  fechaCreacion: admin.firestore.Timestamp;
  token: string;
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

  async buscarPorToken(token: string): Promise<Usuario | null> {
    const snapshot = await this.coleccion
      .where('token', '==', token)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const datos = snapshot.docs[0].data() as UsuarioFirestore;
    return this.mapearAEntidad(datos);
  }

  async crear(usuario: Usuario): Promise<Usuario> {
    const datosFirestore: UsuarioFirestore = {
      id: usuario.id,
      correo: usuario.obtenerCorreoTexto(),
      fechaCreacion: admin.firestore.Timestamp.fromDate(usuario.fechaCreacion),
      token: usuario.token,
    };

    await this.coleccion.doc(usuario.id).set(datosFirestore);

    return usuario;
  }

  private mapearAEntidad(datos: UsuarioFirestore): Usuario {
    return new Usuario({
      id: datos.id,
      correo: new CorreoElectronico(datos.correo),
      fechaCreacion: datos.fechaCreacion.toDate(),
      token: datos.token,
    });
  }
}
