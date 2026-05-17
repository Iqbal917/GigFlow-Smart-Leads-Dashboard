# GigFlow - Smart Leads Dashboard

GigFlow is a full-stack, smart lead management dashboard designed with a focus on rich aesthetics, dynamic user experience, and seamless role-based access control.

## 🚀 Features

### Core Capabilities
- **Authentication**: JWT-based secure authentication with bcrypt password hashing.
- **Lead Management**: Full CRUD operations for leads (Name, Email, Status, Source).
- **Advanced Filtering & Search**: Combine Debounced Search with multi-dimensional filtering (Status, Source) and robust sorting.
- **Backend Pagination**: Fast and efficient rendering of 10 leads per page.

### Premium UI/UX
- **Dynamic Dark Mode**: Full Dark/Light theme toggle built with modern Tailwind CSS v4.
- **Glassmorphism Design**: Sleek, transparent UI layers with animated background elements.
- **Micro-Animations**: Smooth transitions, hover effects, and loading states to engage users.

### Advanced Features
- **Role-Based Access Control (RBAC)**: Segregated permissions for `admin` and `sales` users. All new signups are assigned the `sales` role by default.
  - *Sales*: Manage leads.
  - *Admin*: All Sales features + Lead Deletion + CSV Export.
- **Robust Validations**: End-to-end type safety and validation utilizing `zod` and `react-hook-form`.
- **CSV Export**: Instantly export your filtered dashboard views directly to CSV.

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Zustand, React Hook Form, Zod, Lucide React, Axios.
- **Backend**: Node.js, Express, TypeScript, MongoDB (Mongoose), JWT, bcryptjs, json2csv.
- **DevOps**: Docker, Docker Compose.

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v22+)
- MongoDB Atlas (Cloud)
- Docker & Docker Compose (Optional for containerized run)

### Option 1: Local Setup

1. **Clone the repository** (if applicable).
2. **Setup Environment Variables**:
   - Navigate to `backend/` and copy `.env.example` to `.env`. Ensure `MONGO_URI` is set to your MongoDB Atlas connection string.
   - Navigate to `frontend/` and copy `.env.example` to `.env`.

3. **Install Dependencies & Run**:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm install
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm install
   npm run dev
   ```

### Option 2: Docker Setup

Run the entire application stack (Frontend and Backend) with a single command. **Make sure you have configured your `.env` files first**, as Docker Compose uses them for environment variables.

```bash
docker-compose up --build -d
```
- **Frontend** will be available at: `http://localhost:4173`
- **Backend API** will be available at: `http://localhost:5000`

---

## 🔐 Test Login Credentials

| Role  | Email            | Password |
|-------|------------------|----------|
| Admin | admin@test.com   | 123456   |
| Sales | sales@test.com   | 123456   |

---

## 📖 API Documentation

### Authentication Routes (`/api/auth`)

#### `POST /register`
Registers a new user. All users are assigned the `sales` role by default.
- **Body**: `{ "name": "...", "email": "...", "password": "..." }`
- **Response**: `{ success, token, user }`

#### `POST /login`
Logs in a user.
- **Body**: `{ "email": "...", "password": "..." }`
- **Response**: `{ success, token, user }`

### Leads Routes (`/api/leads`)
*Requires Bearer Token in `Authorization` header.*

#### `GET /`
Fetch all leads (supports pagination, filtering, search).
- **Query Params**: `page`, `search`, `status`, `source`, `sort`
- **Response**: `{ success, data, pagination }`

#### `POST /`
Create a new lead.
- **Body**: `{ "name": "...", "email": "...", "status": "...", "source": "..." }`

#### `PUT /:id`
Update an existing lead.
- **Body**: `{ ...fieldsToUpdate }`

#### `DELETE /:id`
Delete a lead. **(Admin Only)**

#### `GET /export`
Export leads to CSV based on filters. **(Admin Only)**
- **Query Params**: `search`, `status`, `source`, `sort`
- **Response**: Returns a `text/csv` file.

---

## 👨‍💻 Architecture & Design Decisions

1. **Zod Over Everything**: We use Zod on the backend for request validation and on the frontend bundled with `react-hook-form` to ensure the exact same schemas are enforced across the stack.
2. **Zustand for State Management**: Chosen over Redux for its incredibly light boilerplate, handling Auth state and Dark Mode preferences seamlessly.
3. **Tailwind v4 Setup**: Leveraging the modern `@theme` syntax for CSS variables to cleanly handle light and dark modes without muddying up component markup.