import * as admin from 'firebase-admin';
import { Task } from '../../../domain/entities/task';
import { TaskRepositoryPort } from '../../../domain/ports/task-repository.port';
import { FirebaseConfig } from '../firebase-config';

interface TaskFirestore {
  id: string;
  titulo: string;
  descripcion: string;
  completada: boolean;
  fechaCreacion: admin.firestore.Timestamp;
  usuarioId: string;
}

export class FirestoreTasksRepository implements TaskRepositoryPort {
  private readonly coleccion: admin.firestore.CollectionReference;

  constructor() {
    this.coleccion = FirebaseConfig.obtenerFirestore().collection('tareas');
  }

  async obtenerPorUsuario(usuarioId: string): Promise<Task[]> {
    const snapshot = await this.coleccion
      .where('usuarioId', '==', usuarioId)
      .get();

    const tareas = snapshot.docs.map((doc) =>
      this.mapearAEntidad(doc.data() as TaskFirestore)
    );

    return this.ordenarTareas(tareas);
  }

  private ordenarTareas(tareas: Task[]): Task[] {
    const pendientes = tareas
      .filter((t) => !t.completada)
      .sort((a, b) => b.fechaCreacion.getTime() - a.fechaCreacion.getTime());

    const completadas = tareas
      .filter((t) => t.completada)
      .sort((a, b) => b.fechaCreacion.getTime() - a.fechaCreacion.getTime());

    return [...pendientes, ...completadas];
  }

  async obtenerPorId(id: string, usuarioId: string): Promise<Task | null> {
    const doc = await this.coleccion.doc(id).get();

    if (!doc.exists) {
      return null;
    }

    const datos = doc.data() as TaskFirestore;

    if (datos.usuarioId !== usuarioId) {
      return null;
    }

    return this.mapearAEntidad(datos);
  }

  async crear(tarea: Task): Promise<Task> {
    const datosFirestore: TaskFirestore = {
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

  async actualizar(tarea: Task): Promise<Task> {
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

  private mapearAEntidad(datos: TaskFirestore): Task {
    return new Task({
      id: datos.id,
      titulo: datos.titulo,
      descripcion: datos.descripcion,
      completada: datos.completada,
      fechaCreacion: datos.fechaCreacion.toDate(),
      usuarioId: datos.usuarioId,
    });
  }
}
