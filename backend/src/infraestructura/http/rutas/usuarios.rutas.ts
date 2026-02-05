import { Router } from 'express';
import { UsuariosControlador } from '../controladores/usuarios.controlador';
import { validarCuerpo } from '../middlewares/validacion.middleware';

const enrutadorUsuarios = Router();

enrutadorUsuarios.get(
  '/buscar',
  UsuariosControlador.buscar
);

enrutadorUsuarios.post(
  '/',
  validarCuerpo({
    correo: { requerido: true, tipo: 'string' },
  }),
  UsuariosControlador.crear
);

export { enrutadorUsuarios };
