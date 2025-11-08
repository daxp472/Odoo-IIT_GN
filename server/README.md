# OneFlow Backend API

**OneFlow - Plan to Bill** is a comprehensive backend API server built with Node.js, Express.js, and Supabase for project management, time tracking, and billing workflows.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with Supabase integration
- **Role-Based Access Control**: Admin, Project Manager, and Team Member roles
- **Project Management**: Complete CRUD operations for projects
- **Task Management**: Task creation, assignment, and tracking
- **Time Tracking**: Timesheet management with approval workflow
- **Financial Management**: Sales orders, purchases, expenses, and invoicing
- **Dashboard Analytics**: Revenue, cost, profit, and user statistics
- **API Documentation**: Auto-generated Swagger/OpenAPI documentation
- **Production Ready**: Error handling, rate limiting, security middleware

## 🛠️ Tech Stack

- **Runtime**: Node.js (Latest LTS)
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth + JWT
- **Language**: TypeScript
- **Validation**: Zod
- **Documentation**: Swagger UI
- **Security**: Helmet, CORS, Rate Limiting

## 📋 Prerequisites

Before running this project, make sure you have:

1. **Node.js** (v18 or higher)
2. **npm** or **yarn**
3. **Supabase Account** and Project

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd oneflow-backend
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

### 3. Database Setup

You need to set up the following tables in your Supabase database:

```sql
-- Users profiles table
CREATE TABLE profiles (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text,
  role text DEFAULT 'team_member' CHECK (role IN ('admin', 'project_manager', 'team_member')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Projects table
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  client text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  budget decimal NOT NULL,
  status text DEFAULT 'planning' CHECK (status IN ('planning', 'in_progress', 'completed', 'on_hold', 'cancelled')),
  description text,
  revenue decimal DEFAULT 0,
  cost decimal DEFAULT 0,
  profit decimal DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) NOT NULL
);

-- Tasks table
CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  assigned_to uuid REFERENCES auth.users(id),
  status text DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'review', 'completed')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  estimated_hours decimal,
  actual_hours decimal,
  due_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) NOT NULL
);

-- Timesheets table
CREATE TABLE timesheets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  task_id uuid REFERENCES tasks(id) ON DELETE SET NULL,
  description text NOT NULL,
  hours decimal NOT NULL,
  rate decimal,
  date date NOT NULL,
  billable boolean DEFAULT true,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Sales Orders table
CREATE TABLE sales_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  client text NOT NULL,
  project_id uuid REFERENCES projects(id),
  amount decimal NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'completed', 'cancelled')),
  order_date date NOT NULL,
  delivery_date date,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) NOT NULL
);

-- Purchases table
CREATE TABLE purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_number text UNIQUE NOT NULL,
  vendor text NOT NULL,
  project_id uuid REFERENCES projects(id),
  amount decimal NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'ordered', 'received', 'paid', 'cancelled')),
  order_date date NOT NULL,
  delivery_date date,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) NOT NULL
);

-- Expenses table
CREATE TABLE expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  amount decimal NOT NULL,
  category text NOT NULL,
  project_id uuid REFERENCES projects(id),
  description text,
  receipt_url text,
  expense_date date NOT NULL,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) NOT NULL
);

-- Invoices table
CREATE TABLE invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number text UNIQUE NOT NULL,
  client text NOT NULL,
  project_id uuid REFERENCES projects(id),
  amount decimal NOT NULL,
  tax_amount decimal DEFAULT 0,
  total_amount decimal NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  issue_date date NOT NULL,
  due_date date NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) NOT NULL
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE timesheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Create policies (add your RLS policies as needed)
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start at `http://localhost:5000`

### 5. Access API Documentation

Visit `http://localhost:5000/api/docs` to view the interactive Swagger UI documentation.

## 🔐 Authentication

### Register a User
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "full_name": "John Doe",
  "role": "team_member"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Using the JWT Token
Include the returned JWT token in all authenticated requests:

```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📊 API Endpoints Overview

### Authentication (6 endpoints)
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user profile
- `GET /api/users` - List all users (admin only)
- `PUT /api/users/:id/role` - Update user role (admin only)

### Projects (5 endpoints)
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks (5 endpoints)
- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Timesheets (4 endpoints)
- `GET /api/timesheets` - List timesheets
- `POST /api/timesheets` - Create timesheet entry
- `PUT /api/timesheets/:id` - Update timesheet
- `DELETE /api/timesheets/:id` - Delete timesheet

### Sales Orders (5 endpoints)
- `GET /api/sales` - List sales orders
- `POST /api/sales` - Create sales order
- `GET /api/sales/:id` - Get sales order by ID
- `PUT /api/sales/:id` - Update sales order
- `DELETE /api/sales/:id` - Delete sales order

### Purchases (5 endpoints)
- `GET /api/purchases` - List purchases
- `POST /api/purchases` - Create purchase
- `GET /api/purchases/:id` - Get purchase by ID
- `PUT /api/purchases/:id` - Update purchase
- `DELETE /api/purchases/:id` - Delete purchase

### Expenses (5 endpoints)
- `GET /api/expenses` - List expenses
- `POST /api/expenses` - Create expense
- `GET /api/expenses/:id` - Get expense by ID
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Invoices (5 endpoints)
- `GET /api/invoices` - List invoices
- `POST /api/invoices` - Create invoice
- `GET /api/invoices/:id` - Get invoice by ID
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice

### Dashboard (3 endpoints)
- `GET /api/dashboard/overview` - Get overview metrics
- `GET /api/dashboard/financials` - Get financial metrics
- `GET /api/dashboard/user-stats` - Get user statistics

## 🔒 Role-Based Access Control

### Roles
1. **Admin**: Full access to all endpoints
2. **Project Manager**: Can manage projects, tasks, and view financial data
3. **Team Member**: Limited to viewing projects and managing own timesheets/expenses

### Permission Matrix
| Endpoint | Admin | Project Manager | Team Member |
|----------|-------|-----------------|-------------|
| Projects | Full CRUD | Own projects CRUD | Read only |
| Tasks | Full CRUD | Full CRUD | Assigned tasks only |
| Timesheets | Full CRUD | Full CRUD | Own entries only |
| Sales/Purchases/Invoices | Full CRUD | Full CRUD | No access |
| Expenses | Full CRUD | View all, approve | Own entries only |
| Dashboard | Full access | Financial metrics | Own stats only |

## 🌐 Frontend Integration

### Base URL
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Authentication Headers
```javascript
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
};
```

### Example API Call (React)
```javascript
// Login
const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
};

// Get Projects
const getProjects = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/projects`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  return await response.json();
};

// Create Project
const createProject = async (projectData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(projectData)
  });
  
  return await response.json();
};
```

## 🧪 Testing

### Health Check
```bash
GET http://localhost:5000/health
```

### Run Tests
```bash
npm test
```

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## 🔧 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SUPABASE_URL` | Your Supabase project URL | `https://xxx.supabase.co` |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbGciOiJ...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | `eyJhbGciOiJ...` |
| `JWT_SECRET` | Secret for JWT signing | `your-secret-key` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development/production` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

## 🚨 Error Handling

The API uses consistent error response format:

```json
{
  "success": false,
  "message": "Error description",
  "stack": "Error stack (development only)"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.io/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [JWT.io](https://jwt.io/)
- [Swagger/OpenAPI Specification](https://swagger.io/specification/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 💬 Support

For support, email support@oneflow.com or create an issue on GitHub.

---

**Happy coding! 🚀**