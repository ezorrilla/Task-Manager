# Task Manager

Aplicacion de gestion de tareas construida con Angular 19, Node/Express y Firebase.

## Estructura del Proyecto

```
task-manager/
├── frontend/          → Angular 19 (standalone, signals, new control flow)
├── backend/           → Node + Express + TypeScript (Cloud Functions)
└── .github/workflows/ → CI/CD con GitHub Actions
```

## Tecnologias

### Backend
- Node.js 18+ con Express 4.x
- TypeScript 5.x (strict mode)
- Firebase Cloud Functions
- Firebase Firestore
- Arquitectura Hexagonal (DDD)
- Jest para pruebas unitarias

### Frontend
- Angular 19 (standalone components, signals)
- Angular Material 19
- Bootstrap 5 (grid system)
- SCSS con variables globales
- Jasmine/Karma para pruebas

## Arquitectura

### Backend (Hexagonal / DDD)
```
src/
├── dominio/          → Entidades, Value Objects, Puertos
├── aplicacion/       → Casos de uso, DTOs, Mapeadores
└── infraestructura/  → Firebase, HTTP (Express), Factories
```

### Frontend (Feature-based)
```
src/app/
├── nucleo/           → Servicios core, interceptores, guards
├── compartido/       → Componentes, pipes, directivas reutilizables
└── funcionalidades/  → Modulos de autenticacion y tareas
```

## Requisitos Previos

- Node.js 18+
- Angular CLI 19
- Firebase CLI
- Cuenta de Firebase con proyecto configurado

## Instalacion

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
ng serve
```

La aplicacion estara disponible en `http://localhost:4200`

## Configuracion de Firebase

1. Crear proyecto en Firebase Console
2. Habilitar Firestore
3. Descargar credenciales de servicio
4. Configurar variables de entorno en `backend/.env`

## Endpoints del API

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | /api/usuarios/buscar?correo=x | Buscar usuario por correo |
| POST | /api/usuarios | Crear nuevo usuario |
| GET | /api/tareas | Obtener tareas del usuario |
| POST | /api/tareas | Crear nueva tarea |
| PUT | /api/tareas/:id | Actualizar tarea |
| DELETE | /api/tareas/:id | Eliminar tarea |

## Scripts

### Backend
| Script | Descripcion |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Compilar TypeScript a JavaScript |
| `npm run test` | Ejecutar pruebas con cobertura |
| `npm run deploy` | Desplegar a Firebase Functions |

### Frontend
| Script | Descripcion |
|--------|-------------|
| `ng serve` | Servidor de desarrollo |
| `ng build` | Build de produccion optimizado |
| `ng test` | Ejecutar pruebas unitarias |

## Pruebas

### Backend
```bash
cd backend
npm test
```
Cobertura: 97%

### Frontend
```bash
cd frontend
ng test
```

## Patrones y Buenas Practicas

- SOLID principles
- DDD en backend (entidades ricas, value objects)
- Repository pattern con interfaces/puertos
- Factory pattern para inyeccion de dependencias
- Smart/Dumb components en frontend
- Signals para estado reactivo
- Lazy loading de modulos
- trackBy en listas para optimizacion
- ARIA labels para accesibilidad

## Licencia

MIT
