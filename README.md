# 🎓 CourseHub Backend

API REST para una plataforma de cursos online (LMS), desarrollada con
Node.js, Express, PostgreSQL y Prisma.

Incluye autenticación con JWT, gestión de cursos, secciones y lecciones, inscripciones, seguimiento de progreso, dashboard de usuario, reviews y rating de cursos.

------------------------------------------------------------------------

## 🧠 Sobre el proyecto

CourseHub simula el backend de una plataforma educativa moderna, donde
los usuarios pueden:

-   Registrarse y autenticarse
-   Inscribirse en cursos
-   Consumir contenido estructurado (secciones + lecciones)
-   Marcar progreso de aprendizaje
-   Dejar reviews y calificaciones
-   Visualizar estadísticas en su dashboard

El proyecto está diseñado siguiendo buenas prácticas de arquitectura
backend.

------------------------------------------------------------------------

## ⚙️ Tecnologías

-   Node.js
-   Express
-   PostgreSQL
-   Prisma ORM
-   JWT (jsonwebtoken)
-   bcrypt
-   dotenv
-   CORS
-   Zod (validación)

------------------------------------------------------------------------

## 🧱 Arquitectura

Estructura basada en separación por capas:

```bash
src/
├── config/
├── controllers/
├── middlewares/
├── routes/
├── schemas/
├── services/
├── app.js
└── server.js

prisma/
├── migrations/
├── schema.prisma
└── seed.js
```
------------------------------------------------------------------------

## 🚀 Instalación y ejecución

### 1. Clonar repositorio

git clone https://github.com/TU_USUARIO/coursehub-backend.git cd
coursehub-backend

### 2. Instalar dependencias

npm install

### 3. Configurar variables de entorno

Crear archivo `.env`:

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/coursehub"
JWT_SECRET="super_secret_key" PORT=3000

### 4. Ejecutar migraciones

npx prisma migrate dev

### 5. Ejecutar seed

npm run seed

### 6. Levantar servidor

npm run dev

Servidor: http://localhost:3000

------------------------------------------------------------------------

## 👤 Usuarios de prueba

Admin: admin@coursehub.com / admin123

User: user@coursehub.com / user123

------------------------------------------------------------------------

## 🔐 Autenticación

Header requerido:

Authorization: Bearer TU_TOKEN

------------------------------------------------------------------------

## 📚 Endpoints

Auth: POST /api/auth/register\
POST /api/auth/login

Courses: GET /api/courses\
GET /api/courses/:id\
GET /api/courses/:id/full\
GET /api/courses/admin/all\
POST /api/courses\
PATCH /api/courses/:id\
DELETE /api/courses/:id

Sections: GET /api/sections/course/:courseId\
POST /api/sections\
PATCH /api/sections/:id\
DELETE /api/sections/:id

Lessons: GET /api/lessons/section/:sectionId\
POST /api/lessons\
PATCH /api/lessons/:id\
DELETE /api/lessons/:id

Enrollments: POST /api/enrollments\
GET /api/enrollments/my-courses

Progress: POST /api/progress\
GET /api/progress/course/:courseId

Dashboard: GET /api/dashboard/me

Reviews & Rating: POST /api/reviews
GET /api/reviews/course/:courseId
GET /api/reviews/course/:courseId/rating

------------------------------------------------------------------------

## 🧪 Testing

Podés usar Insomnia o Postman.

Flujo: Login → Crear curso → Crear section → Crear lesson → Enroll →
Progress → Crear review → Ver rating → Dashboard

------------------------------------------------------------------------

## 🗄️ DB UI

npx prisma studio

------------------------------------------------------------------------

## 🎯 Objetivo

Proyecto backend orientado a simular una plataforma educativa real,
aplicando buenas prácticas de arquitectura, autenticación y modelado de
datos.

------------------------------------------------------------------------

## 🔮 Mejoras futuras

-   Upload de contenido (videos/archivos)
-   Tests automatizados (Jest)
-   Documentación con Swagger
-   Sistema de pagos / suscripciones
-   Deploy en producción

------------------------------------------------------------------------

## 👨‍💻 Autor

Ignacio Bruno
