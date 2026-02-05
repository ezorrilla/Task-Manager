# Task Manager

Aplicacion de gestion de tareas construida con Angular 19, Node/Express y Firebase Cloud Functions.

## Estructura del Proyecto

```
task-manager/
├── frontend/          → Angular 19 (standalone, signals, new control flow)
├── backend/           → Node + Express + TypeScript (Cloud Functions)
├── firebase.json      → Configuracion de Firebase
├── firestore.rules    → Reglas de seguridad Firestore
└── .github/workflows/ → CI/CD con GitHub Actions
```

## Tecnologias

### Backend
- Node.js 18 con Express 4.x
- TypeScript 5.x (strict mode)
- **Firebase Cloud Functions**
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

- Node.js 18
- Angular CLI 19
- Firebase CLI (`npm install -g firebase-tools`)
- Cuenta de Firebase con proyecto configurado

## Configuracion Inicial de Firebase

### 1. Login en Firebase
```bash
firebase login
```

### 2. Crear proyecto en Firebase Console
- Ve a https://console.firebase.google.com
- Crea un nuevo proyecto
- Habilita Firestore Database (modo prueba para desarrollo)

### 3. Configurar proyecto local
```bash
# En la raiz del proyecto, edita .firebaserc
# Reemplaza "TU-PROYECTO-ID" con el ID de tu proyecto
```

## Desarrollo Local

### Backend (Terminal 1)
```bash
cd backend
npm install
npm run dev
```
> API disponible en `http://localhost:3000`

### Frontend (Terminal 2)
```bash
cd frontend
npm install
ng serve
```
> App disponible en `http://localhost:4200`

## Despliegue a Firebase

### Desplegar Cloud Functions (Backend)
```bash
cd backend
npm run build
firebase deploy --only functions
```

### Desplegar Hosting (Frontend)
```bash
cd frontend
ng build --configuration=production
firebase deploy --only hosting
```

### Desplegar Todo
```bash
# Desde la raiz del proyecto
firebase deploy
```

## Endpoints del API

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | /api/usuarios/buscar?correo=x | Buscar usuario por correo |
| POST | /api/usuarios | Crear nuevo usuario |
| GET | /api/tareas | Obtener tareas del usuario |
| POST | /api/tareas | Crear nueva tarea |
| PUT | /api/tareas/:id | Actualizar tarea |
| DELETE | /api/tareas/:id | Eliminar tarea |

**URL en produccion:** `https://us-central1-TU-PROYECTO.cloudfunctions.net/api`

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
├── dominio/          → Entidades, Value Objects, Puertos
├── aplicacion/       → Casos de uso, DTOs, Mapeadores
├── infraestructura/  → Firebase, HTTP (Express), Factories
└── index.ts          → Export Cloud Function
```

### Frontend (Feature-based)
```
src/app/
├── nucleo/           → Servicios core, interceptores, guards
├── compartido/       → Componentes, pipes, directivas
└── funcionalidades/  → Modulos de autenticacion y tareas
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
