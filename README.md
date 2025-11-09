<div align="center">
  <img src="https://user-images.githubusercontent.com/placeholder-logo.png" alt="OneFlow Logo" width="120" />
  
  # OneFlow - Plan to Bill in One Place
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20Mode-blue)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-18%2B-blue)](https://reactjs.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-Cloud%20Backend-orange)](https://supabase.io/)
  
  **OneFlow** is a comprehensive project management and billing solution that streamlines the entire business workflow from initial planning to final invoicing.
  
  [Live Demo](https://youtu.be/RmpK2KSEHxQ) • 
  [Documentation](#-documentation) • 
  [Features](#-key-features) • 
  [Installation](#-getting-started)
</div>

## 🎥 Demo Video

Check out our comprehensive demo to see OneFlow in action:

[![OneFlow Demo Video](https://img.youtube.com/vi/YOUR_VIDEO_ID_HERE/maxresdefault.jpg)](https://youtu.be/RmpK2KSEHxQ)

*Click the image above to watch the full demo video showcasing all features of OneFlow.*

*Replace `YOUR_VIDEO_ID_HERE` with your actual YouTube video ID.*

## 🌟 Why OneFlow?

OneFlow eliminates the complexity of managing multiple tools by providing an integrated platform that connects project planning, resource allocation, time tracking, and financial management. Built for modern teams who demand efficiency and transparency.

### Key Benefits:
- **All-in-One Solution**: No more switching between 5 different tools
- **Real-time Collaboration**: Team members stay synchronized with live updates
- **Financial Transparency**: Track revenue, costs, and profits in real-time
- **Role-Based Access**: Secure access control for different user types
- **Professional Invoicing**: Generate and export invoices with one click

## 🚀 Key Features

### 📊 Project & Task Management
- **Interactive Dashboard**: Real-time overview of all projects and metrics
- **Advanced Task Tracking**: Assign, prioritize, and monitor task progress
- **Visual Progress Indicators**: Gantt charts and progress bars for clear visualization
- **Resource Planning**: Allocate team members and track utilization

### ⏱️ Time & Expense Tracking
- **Timesheet Management**: Simple time logging with detailed descriptions
- **Expense Recording**: Capture project expenses with receipt uploads
- **Approval Workflows**: Streamlined manager approval processes
- **Automated Billing**: Direct integration with invoicing system

### 💰 Financial Management
- **Sales Orders**: Track client commitments and project scopes
- **Purchase Orders**: Manage vendor relationships and procurement
- **Professional Invoicing**: Generate invoices with PDF export capability
- **Financial Analytics**: Comprehensive reporting on revenue, costs, and profitability

### 🛒 Product Management
- **Product Catalog**: Maintain a centralized database of products/services
- **Pricing Engine**: Flexible pricing with tax and currency support
- **Inventory Tracking**: SKU and barcode management
- **Cross-Reference**: Link products to sales, purchases, and invoices

### 👥 Role-Based Access Control
- **Admin**: Full system access and user management
- **Project Manager**: Project creation, team management, and financial oversight
- **Team Member**: Task execution and time tracking
- **Role Request System**: Self-service role upgrades with admin approval

### 🔄 Real-time Collaboration
- **Secure Authentication**: JWT-based login with Supabase Auth
- **Live Updates**: Real-time data synchronization across all devices
- **Notification System**: Automated alerts for important events
- **Activity Logs**: Complete audit trail of all system activities

## 🛠️ Technology Stack

### Frontend
```bash
React 18 + TypeScript + Vite
Tailwind CSS for styling
React Context API for state management
Responsive design for all devices
```

### Backend
```bash
Node.js with Express.js
Supabase (PostgreSQL) for database
Supabase Auth for authentication
Swagger/OpenAPI for API documentation
Zod for data validation
```

### Infrastructure
```bash
Supabase Platform for hosting
Supabase Storage for file management
Supabase Real-time for live updates
JWT, CORS, and Rate Limiting for security
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**
- **Supabase Account**

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/oneflow.git
cd oneflow
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