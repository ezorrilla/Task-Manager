import * as admin from 'firebase-admin';
import { Tarea } from '../../../dominio/entidades/tarea';
import { RepositorioTareasPuerto } from '../../../dominio/puertos/repositorio-tareas.puerto';
import { ConfiguracionFirebase } from '../configuracion-firebase';

interface TareaFirestore {
  id: string;
  titulo: string;
  descripcion: string;
  completada: boolean;
  fechaCreacion: admin.firestore.Timestamp;
  usuarioId: string;
}

export class FirestoreTareasRepositorio implements RepositorioTareasPuerto {
  private readonly coleccion: admin.firestore.CollectionReference;

  constructor() {
    this.coleccion = ConfiguracionFirebase.obtenerFirestore().collection('tareas');
  }

  async obtenerPorUsuario(usuarioId: string): Promise<Tarea[]> {
    const snapshot = await this.coleccion
      .where('usuarioId', '==', usuarioId)
      .orderBy('fechaCreacion', 'desc')
      .get();

    return snapshot.docs.map((doc) =>
      this.mapearAEntidad(doc.data() as TareaFirestore)
    );
  }

  async obtenerPorId(id: string, usuarioId: string): Promise<Tarea | null> {
    const doc = await this.coleccion.doc(id).get();

    if (!doc.exists) {
      return null;
    }

    const datos = doc.data() as TareaFirestore;

    if (datos.usuarioId !== usuarioId) {
      return null;
    }

    return this.mapearAEntidad(datos);
  }

  async crear(tarea: Tarea): Promise<Tarea> {
    const datosFirestore: TareaFirestore = {
      id: tarea.id,
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      completada: tarea.completada,
      fechaCreacion: admin.firestore.Timestamp.fromDate(tarea.fechaCreacion),
      usuarioId: tarea.usuarioId,
    };

    await this.coleccion.doc(tarea.id).set(datosFirestore);

    return tarea;
  }

  async actualizar(tarea: Tarea): Promise<Tarea> {
    await this.coleccion.doc(tarea.id).update({
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      completada: tarea.completada,
    });

    return tarea;
  }

  async eliminar(id: string, _usuarioId: string): Promise<void> {
    await this.coleccion.doc(id).delete();
  }

  private mapearAEntidad(datos: TareaFirestore): Tarea {
    return new Tarea({
      id: datos.id,
      titulo: datos.titulo,
      descripcion: datos.descripcion,
      completada: datos.completada,
      fechaCreacion: datos.fechaCreacion.toDate(),
      usuarioId: datos.usuarioId,
    });
  }
}
