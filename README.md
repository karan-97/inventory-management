# 🛒 Inventory Management System (Node.js, Express, Prisma, PostgreSQL)

An advanced **Inventory Management System** built using **Node.js**, **Express**, **TypeScript**, and **Prisma ORM** with **PostgreSQL**. This system supports **authentication**, **RBAC (Role-Based Access Control)**, **Category Management**, and lays the foundation for future features like **Product Management**, **Reporting**, and **Low Stock Alerts**.

---

## 🚀 Features
- **Authentication & Authorization** (JWT)
- **Role-Based Access Control** (Admin & User)
- **Category Management** with Subcategories
- **Product Management** (Admin)
- API validation using **Joi** and **express-validation**
- Consistent, standardized API responses with **camelCase**
- Scalable architecture with **Controller-Service** pattern

---

## 🛠️ Tech Stack
- **Node.js** & **Express.js**
- **TypeScript** for strong type-checking
- **Prisma ORM** for database management
- **PostgreSQL** as the relational database
- **JWT** for authentication
- **bcryptjs** for secure password hashing
- **Joi** for request validation
- **Nodemailer** for email notifications

---

### 📄 API Documentation (Postman)
For detailed API documentation, check out our [API Docs](https://documenter.getpostman.com/view/43178232/2sAYkDPM5n).

## 📂 Project Structure
```bash
src/
├── constants/            # Application constants and configurations
│   ├── jwt.ts
│   ├── messages.ts
│   └── role-permissions.ts
├── controllers/          # Request handlers
│   ├── auth.controller.ts
│   ├── category.controller.ts
│   └── product.controller.ts
├── docs/                 # API documentation
│   ├── swagger.docs.ts
│   └── swagger.json
├── helpers/              # Utility functions and helpers
│   └── response.helpers.ts
├── routes/               # API route definitions
│   ├── auth.routes.ts
│   ├── category.routes.ts
│   ├── product.routes.ts
│   ├── health.route.ts
│   └── index.ts
├── services/             # Business logic and data interaction
│   ├── auth.service.ts
│   ├── category.service.ts
│   └── product.service.ts
├── utils/                # Miscellaneous utilities
├── validators/           # Request validation schemas
│   ├── auth.validation.ts
│   ├── category.validation.ts
│   └── product.validation.ts
├── app.ts                # Express app configuration
└── server.ts             # HTTP server initialization


```


---

## ⚙️ Setup Instructions
### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/inventory-management.git
cd inventory-management
```

### Step 2: Install Dependency
```bash
npm install
```

### Step 3: Configure Environment Variables
```bash
# Server Configuration
NODE_ENV=dev
PORT=5000
JWT_SECRET="jkafs8fdanjsfdjkahsdfasd"
SALT_ROUND=10
JWT_EXPIRES_IN = "7d"

RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=root
POSTGRES_DB=inventory-management
POSTGRES_SCHEMA=inventory-management

DATABASE_URL=`postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=${POSTGRES_SCHEMA}`

#API URL
API_BASE_URL=`http://localhost:${PORT}`

#ADMIN DETAILS
ADMIN_NAME="Karan Ganwani"
ADMIN_EMAIL=admin@inventory.com
ADMIN_PASSWORD=Admin@123
```

### Step 4: Set Up the Database

Note: Make sure PostgreSQL is installed and a database is created.

#### Update the Prisma schema:
```bash
npm run prisma:generate
```

#### Run database migrations:
```bash
npm run prisma:migrate
```

#### Seed the database with roles and an admin user:
```bash
npm rum prisma:seed
```

#### Start the server
```bash
npm run dev
```