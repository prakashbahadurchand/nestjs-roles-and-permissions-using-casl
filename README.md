# NestJS CASL & TypeORM Boilerplate

This project is a NestJS starter boilerplate demonstrating a robust setup for building RESTful APIs. It includes Authentication (JWT), User & Article Management, Role-Based Access Control (RBAC) with CASL, TypeORM with MySQL (including migrations and seeding), Swagger API documentation, and standardized API responses.

## Overview

Key features:

- **Authentication**: Secure user registration, login, and logout using JWT.
- **User Management**: Basic CRUD operations for user profiles.
- **Article Management**: Full CRUD for articles, including publishing status.
- **Permissions**: Fine-grained access control with CASL (Admin, Author, Reader roles).
- **Database**: MySQL integration via TypeORM, with CLI support for migrations and data seeding.
- **API Documentation**: Interactive API docs via Swagger at `/api`.
- **Standard Responses**: Uniform JSON structure for all API responses.

## Prerequisites

- Node.js (v18 or higher recommended)
- NPM (or Yarn)
- MySQL Server

## Getting Started

### 1. Clone & Install

```bash
# Clone the repository (replace with your actual URL if different)
git clone https://github.com/your-username/nestjs-roles-and-permissions-using-casl.git
cd nestjs-roles-and-permissions-using-casl

# Install dependencies
npm install
```

### 2. Environment Configuration

- **Database**: Ensure MySQL is running. Create a database (e.g., `nestjs_casl_demo`).
- **Credentials**: Update DB connection details in `src/app.module.ts` and `src/data-source.ts` (host, port, username, password, database).
- **JWT Secret**: Change the `secret` in `src/modules/auth/auth.module.ts` for `JwtModule.register`.

**Recommendation**: Use environment variables for sensitive data in production (`@nestjs/config`).

### 3. Database Setup (Migrations & Seeding)

Ensure `synchronize: false` is set in `src/app.module.ts` for TypeORM.

```typescript
// src/app.module.ts
TypeOrmModule.forRoot({
  // ... other options
  synchronize: false, // Crucial for migrations
}),
```

Then, run:

```bash
# Generate initial migration (creates User & Article tables)
npm run migration:generate --name=InitialEntities

# Apply migrations
npm run migration:run

# Populate with seed data
npm run seed:run
```

Default seeded user credentials:

- Admin: `admin` / `Admin@123`
- Author: `author1` / `Author@123`
- Reader: `reader1` / `Reader@123`

To revert the last migration:

```bash
npm run migration:revert
```

### 4. Running the Application

```bash
# Development mode with watch
npm run start:dev
```

Access at `http://localhost:3000`. Swagger docs at `http://localhost:3000/api`.

## Key NPM Scripts

- `npm run start:dev`: Dev mode.
- `npm run build`: Production build.
- `npm run format`: Format code.
- `npm run lint`: Lint code.
- `npm test`: Unit tests.
- `npm test:e2e`: E2E tests.
- `npm run typeorm -- <command>`: TypeORM CLI (e.g., `migration:show`).

## Project Structure

- `src/main.ts`: App entry, Swagger.
- `src/app.module.ts`: Root module, TypeORM config.
- `src/data-source.ts`: TypeORM CLI config.
- `src/core/common/`: Shared DTOs, interceptors.
- `src/core/database/`: Migrations, seeds.
- `src/modules/`: Feature modules (Auth, Users, Articles, CASL).

## Core Features & Endpoints

- **Authentication**:
  - `POST /auth/register`
  - `POST /auth/login`
  - `POST /auth/logout`
- **Users & Articles**: CRUD (see Swagger).
- **Permissions (CASL)**:
  - Admin: Full control.
  - Author: Create articles; manage own articles.
  - Reader: Read articles; update own profile.
- **API Response Format**:

```json
{
  "statusCode": 200,
  "message": "Success",
  "data": { /* payload */ },
  "error": null
}
```

---

## Original NestJS Starter Documentation

(Generic info from default NestJS starter README)

### Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

### Installation

```bash
npm install
```

### Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

### Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

### For generate doc

```base
npx @compodoc/compodoc -p tsconfig.json -s
```

### Support

Nest is an MIT-licensed open source project. More info: [NestJS Support](https://docs.nestjs.com/support).

### Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

### License

Nest is [MIT licensed](LICENSE).
