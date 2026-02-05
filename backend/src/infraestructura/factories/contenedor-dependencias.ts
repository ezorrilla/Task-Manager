import { FirestoreTareasRepositorio } from '../firebase/adaptadores/firestore-tareas.repositorio';
import { FirestoreUsuariosRepositorio } from '../firebase/adaptadores/firestore-usuarios.repositorio';
import { BuscarUsuarioCasoUso } from '../../aplicacion/casos-uso/usuarios/buscar-usuario.caso-uso';
import { CrearUsuarioCasoUso } from '../../aplicacion/casos-uso/usuarios/crear-usuario.caso-uso';
import { ObtenerTareasCasoUso } from '../../aplicacion/casos-uso/tareas/obtener-tareas.caso-uso';
import { CrearTareaCasoUso } from '../../aplicacion/casos-uso/tareas/crear-tarea.caso-uso';
import { ActualizarTareaCasoUso } from '../../aplicacion/casos-uso/tareas/actualizar-tarea.caso-uso';
import { EliminarTareaCasoUso } from '../../aplicacion/casos-uso/tareas/eliminar-tarea.caso-uso';

export class ContenedorDependencias {
  private static instancia: ContenedorDependencias;

  private readonly repositorioUsuarios: FirestoreUsuariosRepositorio;
  private readonly repositorioTareas: FirestoreTareasRepositorio;

  private constructor() {
    this.repositorioUsuarios = new FirestoreUsuariosRepositorio();
    this.repositorioTareas = new FirestoreTareasRepositorio();
  }

  static obtenerInstancia(): ContenedorDependencias {
    if (!this.instancia) {
      this.instancia = new ContenedorDependencias();
    }

    return this.instancia;
  }

  obtenerBuscarUsuario(): BuscarUsuarioCasoUso {
    return new BuscarUsuarioCasoUso(this.repositorioUsuarios);
  }

  obtenerCrearUsuario(): CrearUsuarioCasoUso {
    return new CrearUsuarioCasoUso(this.repositorioUsuarios);
  }

  obtenerObtenerTareas(): ObtenerTareasCasoUso {
    return new ObtenerTareasCasoUso(this.repositorioTareas);
  }

  obtenerCrearTarea(): CrearTareaCasoUso {
    return new CrearTareaCasoUso(this.repositorioTareas);
  }

  obtenerActualizarTarea(): ActualizarTareaCasoUso {
    return new ActualizarTareaCasoUso(this.repositorioTareas);
  }

  obtenerEliminarTarea(): EliminarTareaCasoUso {
    return new EliminarTareaCasoUso(this.repositorioTareas);
  }
}
