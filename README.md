# Task Manager

Aplicacion de gestion de tareas construida con Angular, Node/Express y Firebase.

## Estructura del Proyecto

```
task-manager/
├── frontend/    → Angular 19 (standalone components, signals)
├── backend/     → Node + Express + TypeScript (Cloud Functions)
└── .github/     → CI/CD con GitHub Actions
```

## Tecnologias

### Backend
- Node.js + Express + TypeScript
- Firebase Cloud Functions
- Firebase Firestore
- Arquitectura Hexagonal (DDD)

### Frontend
- Angular 19 (standalone, signals, new control flow)
- Angular Material + Bootstrap 5
- SCSS con variables globales

## Requisitos Previos

- Node.js 18+
- Angular CLI
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
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Compilar TypeScript
- `npm run test` - Ejecutar pruebas
- `npm run deploy` - Desplegar a Firebase

### Frontend
- `ng serve` - Servidor de desarrollo
- `ng build` - Build de produccion
- `ng test` - Ejecutar pruebas unitarias
