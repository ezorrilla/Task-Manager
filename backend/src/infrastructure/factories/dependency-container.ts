import { FirestoreTasksRepository } from '../firebase/adapters/firestore-tasks.repository';
import { FirestoreUsersRepository } from '../firebase/adapters/firestore-users.repository';
import { FindUserUseCase } from '../../application/use-cases/users/find-user.use-case';
import { CreateUserUseCase } from '../../application/use-cases/users/create-user.use-case';
import { GetTasksUseCase } from '../../application/use-cases/tasks/get-tasks.use-case';
import { CreateTaskUseCase } from '../../application/use-cases/tasks/create-task.use-case';
import { UpdateTaskUseCase } from '../../application/use-cases/tasks/update-task.use-case';
import { DeleteTaskUseCase } from '../../application/use-cases/tasks/delete-task.use-case';

export class DependencyContainer {
  private static instancia: DependencyContainer;

  private readonly repositorioUsuarios: FirestoreUsersRepository;
  private readonly repositorioTareas: FirestoreTasksRepository;

  private constructor() {
    this.repositorioUsuarios = new FirestoreUsersRepository();
    this.repositorioTareas = new FirestoreTasksRepository();
  }

  static obtenerInstancia(): DependencyContainer {
    if (!this.instancia) {
      this.instancia = new DependencyContainer();
    }

    return this.instancia;
  }

  obtenerBuscarUsuario(): FindUserUseCase {
    return new FindUserUseCase(this.repositorioUsuarios);
  }

  obtenerCrearUsuario(): CreateUserUseCase {
    return new CreateUserUseCase(this.repositorioUsuarios);
  }

  obtenerObtenerTareas(): GetTasksUseCase {
    return new GetTasksUseCase(this.repositorioTareas);
  }

  obtenerCrearTarea(): CreateTaskUseCase {
    return new CreateTaskUseCase(this.repositorioTareas);
  }

  obtenerActualizarTarea(): UpdateTaskUseCase {
    return new UpdateTaskUseCase(this.repositorioTareas);
  }

  obtenerEliminarTarea(): DeleteTaskUseCase {
    return new DeleteTaskUseCase(this.repositorioTareas);
  }
}
