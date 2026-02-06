# Task Manager

Aplicacion de gestion de tareas construida con Angular 19, Node/Express y Firebase Cloud Functions.

## Estructura del Proyecto

```
task-manager/
- frontend/          -> Angular 19 (standalone, signals, new control flow)
- backend/           -> Node + Express + TypeScript (Cloud Functions)
- firebase.json      -> Configuracion de Firebase
- firestore.rules    -> Reglas de seguridad Firestore
- .github/workflows/ -> GitHub Actions (CI/CD)
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

## Requisitos Previos

- Node.js 18+
- Angular CLI 19
- Firebase CLI (`npm install -g firebase-tools`)
- Cuenta de Firebase con proyecto configurado

## Configuracion Inicial de Firebase

### 1. Login en Firebase
```bash
firebase login
```

### 2. Crear proyecto en Firebase Console
- Crea un proyecto en Firebase Console
- Habilita Firestore Database

### 3. Configurar proyecto local
```bash
# En la raiz del proyecto, edita .firebaserc
# Reemplaza el project id con el tuyo
```

### 4. Credenciales del Backend (Local)
Por defecto el backend busca `firebase-credentials.json` en el root de `backend`.
Tambien puedes usar una de estas variables:
- `FIREBASE_CREDENTIALS_PATH` (ruta a un service account JSON)
- `GOOGLE_APPLICATION_CREDENTIALS` (credenciales por defecto de Google)

## Desarrollo Local

### Backend (Terminal 1)
```bash
cd backend
npm install
npm run dev
```
API disponible en `http://localhost:3000`

### Frontend (Terminal 2)
```bash
cd frontend
npm install
ng serve
```
App disponible en `http://localhost:4200`

## Despliegue a Firebase

### Desplegar Cloud Functions (Backend)
```bash
cd backend
npm run build
firebase deploy --only functions
```

### Desplegar Hosting (Frontend)
```bash
npm --prefix frontend run build
firebase deploy --only hosting
```

### Desplegar Todo
```bash
# Desde la raiz del proyecto
firebase deploy
```

## CI/CD (GitHub Actions)

### CI (Integracion Continua)
- Archivo: `.github/workflows/ci.yml`
- Corre en `push` y `pull_request` a `main` y `develop`.
- Ejecuta pruebas y builds de backend y frontend.

### CD (Despliegue Continuo)
- Archivo: `.github/workflows/deploy.yml`
- Se ejecuta solo cuando el workflow `CI` termina con exito en `main`.
- Despliega Firebase Hosting, Functions y reglas.

#### Credenciales para CD (Service Account JSON)
El workflow no usa credenciales en el repo. Cada persona debe crear su propio secret en GitHub.

1. Crea un Service Account en tu proyecto de Firebase/Google Cloud.
2. Descarga el JSON y guárdalo como secret en tu repositorio:
   - Nombre: `FIREBASE_CREDENTIALS_JSON`
   - Valor: contenido completo del JSON
3. Actualiza `.firebaserc` con tu `projectId`.

El workflow crea el archivo de credenciales temporalmente y nunca se commitea.

## Endpoints del API

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | /api/usuarios/buscar?correo=x | Buscar usuario por correo |
| POST | /api/usuarios | Crear usuario |
| GET | /api/tareas | Obtener tareas del usuario |
| POST | /api/tareas | Crear tarea |
| PUT | /api/tareas/:id | Actualizar tarea |
| DELETE | /api/tareas/:id | Eliminar tarea |

URL base en produccion:
- Hosting: `https://TU-PROYECTO.web.app`
- API via Hosting rewrite: `https://TU-PROYECTO.web.app/api`

## Scripts

### Backend
| Script | Descripcion |
|--------|-------------|
| `npm run dev` | Servidor local con hot reload |
| `npm run build` | Compilar TypeScript |
| `npm run serve` | Emulador de Cloud Functions |
| `npm run deploy` | Desplegar a Cloud Functions |
| `npm run logs` | Ver logs de Cloud Functions |
| `npm run test` | Ejecutar pruebas |

### Frontend
| Script | Descripcion |
|--------|-------------|
| `ng serve` | Servidor de desarrollo |
| `ng build` | Build de produccion |
| `ng test` | Ejecutar pruebas |

## Arquitectura

### Backend (Hexagonal / DDD)
```
src/
- domain/           -> Entidades, Value Objects, Puertos
- application/      -> Casos de uso, DTOs, Mapeadores
- infrastructure/   -> Firebase, HTTP (Express), Factories
- index.ts          -> Export Cloud Function
```

### Frontend (Feature-based)
```
src/app/
- core/             -> Servicios core, interceptores, guards
- shared/           -> Componentes, pipes, directivas
- features/         -> Autenticacion y tareas
```

## Patrones y Buenas Practicas

- SOLID principles
- DDD en backend
- Repository pattern
- Factory pattern para inyeccion de dependencias
- Smart/Dumb components en frontend
- Signals para estado reactivo
- Lazy loading
- trackBy en listas para optimizacion
- ARIA labels para accesibilidad

## Licencia

MIT
