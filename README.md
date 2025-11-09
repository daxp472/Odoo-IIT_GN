# OneFlow - Plan to Bill in One Place

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20Mode-blue)](https://www.typescriptlang.org/)

OneFlow is a comprehensive project management and billing solution that helps businesses plan projects, track time, manage resources, and generate invoices - all in one integrated platform.

## 🌟 Overview

OneFlow streamlines the entire project lifecycle from initial planning to final billing. Built with modern web technologies, it provides a seamless experience for project managers, team members, and administrators to collaborate effectively while maintaining financial transparency.

## 🚀 Key Features

### Project & Task Management
- **Project Dashboard**: Overview of all projects with status tracking
- **Task Management**: Create, assign, and track tasks with due dates and priorities
- **Progress Tracking**: Visual progress indicators and milestone tracking
- **Resource Allocation**: Assign team members to projects and tasks

### Time & Expense Tracking
- **Timesheet Management**: Log hours worked with detailed descriptions
- **Expense Tracking**: Record project-related expenses with receipts
- **Approval Workflows**: Manager approval for timesheets and expenses
- **Billing Integration**: Direct linking of time and expenses to invoices

### Financial Management
- **Sales Orders**: Track client orders and project commitments
- **Purchase Orders**: Manage vendor purchases and supplier relationships
- **Invoicing**: Generate professional invoices with PDF export
- **Financial Analytics**: Revenue, cost, and profit tracking

### Product Management
- **Product Catalog**: Maintain a database of products and services
- **Pricing Management**: Set unit prices, taxes, and currency options
- **Inventory Tracking**: SKU and barcode management
- **Product References**: Link products to sales, purchases, and invoices

### Role-Based Access Control
- **Admin**: Full system access and user management
- **Project Manager**: Project creation, team management, and financial oversight
- **Team Member**: Task execution and time tracking
- **Role Request System**: Users can request role upgrades with admin approval

### Real-time Collaboration
- **User Authentication**: Secure login with Supabase Auth
- **Real-time Updates**: Live data synchronization across all users
- **Notification System**: Status updates and workflow notifications
- **Audit Trail**: Comprehensive logging of all system activities

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **UI Components**: Custom component library

### Backend
- **Runtime**: Node.js (Latest LTS)
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth + JWT
- **API Documentation**: Swagger/OpenAPI
- **Validation**: Zod

### Infrastructure
- **Hosting**: Supabase Platform
- **Storage**: Supabase Storage (for receipts and documents)
- **Real-time**: Supabase Real-time Subscriptions
- **Security**: JWT, CORS, Rate Limiting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**
- **Supabase Account**

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/daxp472/Odoo-IIT_GN.git
cd Odoo-IIT_GN
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file based on `.env.example`:
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

### 3. Setup Frontend
```bash
cd ../client
npm install
```

Create a `.env` file:
```env
VITE_API_BASE_URL=http://localhost:5000
```

### 4. Database Setup
Run the SQL migrations in the `server/supabase/migrations` directory in order:
1. Create tables
2. Set up relationships
3. Add sample data

### 5. Run the Application
```bash
# Start backend server
cd server
npm run dev

# Start frontend development server
cd client
npm run dev
```

Visit `http://localhost:3000` to access the application.

## 📚 API Documentation

The backend API is fully documented with Swagger/OpenAPI. Access the documentation at:
```
http://localhost:5000/api-docs
```

## 🧪 Testing

Run the test suite:
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and suggest improvements.

## 🛡️ Security

Security is a top priority for OneFlow. Please review our [Security Policy](SECURITY.md) for information on how we handle security concerns and how to report vulnerabilities.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.io/) for the amazing backend-as-a-service platform
- [React](https://reactjs.org/) for the frontend framework
- [Express.js](https://expressjs.com/) for the backend framework
- All the open-source libraries and tools that made this project possible

## 📞 Support

For support, please open an issue on GitHub or contact the maintainers.