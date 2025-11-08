import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'OneFlow API',
      version: '1.0.0',
      description: 'OneFlow - Plan to Bill Backend API Documentation',
      contact: {
        name: 'OneFlow Team',
        email: 'support@oneflow.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      },
      {
        url: 'https://api.oneflow.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Project: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            name: {
              type: 'string'
            },
            client: {
              type: 'string'
            },
            start_date: {
              type: 'string',
              format: 'date'
            },
            end_date: {
              type: 'string',
              format: 'date',
              nullable: true
            },
            budget: {
              type: 'number'
            },
            status: {
              type: 'string',
              enum: ['planning', 'in_progress', 'completed', 'on_hold', 'cancelled']
            },
            description: {
              type: 'string',
              nullable: true
            },
            revenue: {
              type: 'number',
              nullable: true
            },
            cost: {
              type: 'number',
              nullable: true
            },
            profit: {
              type: 'number',
              nullable: true
            },
            created_at: {
              type: 'string',
              format: 'date-time'
            },
            updated_at: {
              type: 'string',
              format: 'date-time'
            },
            created_by: {
              type: 'string',
              format: 'uuid'
            }
          }
        },
        CreateProjectRequest: {
          type: 'object',
          required: ['name', 'client', 'start_date', 'budget'],
          properties: {
            name: {
              type: 'string'
            },
            client: {
              type: 'string'
            },
            start_date: {
              type: 'string',
              format: 'date'
            },
            end_date: {
              type: 'string',
              format: 'date'
            },
            budget: {
              type: 'number'
            },
            status: {
              type: 'string',
              enum: ['planning', 'in_progress', 'completed', 'on_hold', 'cancelled'],
              default: 'planning'
            },
            description: {
              type: 'string'
            }
          }
        },
        UpdateProjectRequest: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            client: {
              type: 'string'
            },
            start_date: {
              type: 'string',
              format: 'date'
            },
            end_date: {
              type: 'string',
              format: 'date'
            },
            budget: {
              type: 'number'
            },
            status: {
              type: 'string',
              enum: ['planning', 'in_progress', 'completed', 'on_hold', 'cancelled']
            },
            description: {
              type: 'string'
            },
            revenue: {
              type: 'number'
            },
            cost: {
              type: 'number'
            }
          }
        },
        Task: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            title: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            project_id: {
              type: 'string',
              format: 'uuid'
            },
            assigned_to: {
              type: 'string',
              format: 'uuid'
            },
            status: {
              type: 'string',
              enum: ['todo', 'in_progress', 'review', 'completed']
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high', 'urgent']
            },
            estimated_hours: {
              type: 'number'
            },
            actual_hours: {
              type: 'number'
            },
            due_date: {
              type: 'string',
              format: 'date'
            },
            created_at: {
              type: 'string',
              format: 'date-time'
            },
            updated_at: {
              type: 'string',
              format: 'date-time'
            },
            created_by: {
              type: 'string',
              format: 'uuid'
            }
          }
        },
        CreateTaskRequest: {
          type: 'object',
          required: ['title', 'project_id'],
          properties: {
            title: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            project_id: {
              type: 'string',
              format: 'uuid'
            },
            assigned_to: {
              type: 'string',
              format: 'uuid'
            },
            status: {
              type: 'string',
              enum: ['todo', 'in_progress', 'review', 'completed'],
              default: 'todo'
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high', 'urgent'],
              default: 'medium'
            },
            estimated_hours: {
              type: 'number'
            },
            due_date: {
              type: 'string',
              format: 'date'
            }
          }
        },
        UpdateTaskRequest: {
          type: 'object',
          properties: {
            title: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            assigned_to: {
              type: 'string',
              format: 'uuid'
            },
            status: {
              type: 'string',
              enum: ['todo', 'in_progress', 'review', 'completed']
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high', 'urgent']
            },
            estimated_hours: {
              type: 'number'
            },
            actual_hours: {
              type: 'number'
            },
            due_date: {
              type: 'string',
              format: 'date'
            }
          }
        },
        Timesheet: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            user_id: {
              type: 'string',
              format: 'uuid'
            },
            project_id: {
              type: 'string',
              format: 'uuid'
            },
            task_id: {
              type: 'string',
              format: 'uuid'
            },
            description: {
              type: 'string'
            },
            hours: {
              type: 'number'
            },
            rate: {
              type: 'number'
            },
            date: {
              type: 'string',
              format: 'date'
            },
            billable: {
              type: 'boolean'
            },
            approved: {
              type: 'boolean'
            },
            created_at: {
              type: 'string',
              format: 'date-time'
            },
            updated_at: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        CreateTimesheetRequest: {
          type: 'object',
          required: ['project_id', 'description', 'hours', 'date'],
          properties: {
            project_id: {
              type: 'string',
              format: 'uuid'
            },
            task_id: {
              type: 'string',
              format: 'uuid'
            },
            description: {
              type: 'string'
            },
            hours: {
              type: 'number'
            },
            rate: {
              type: 'number'
            },
            date: {
              type: 'string',
              format: 'date'
            },
            billable: {
              type: 'boolean',
              default: true
            }
          }
        },
        UpdateTimesheetRequest: {
          type: 'object',
          properties: {
            project_id: {
              type: 'string',
              format: 'uuid'
            },
            task_id: {
              type: 'string',
              format: 'uuid'
            },
            description: {
              type: 'string'
            },
            hours: {
              type: 'number'
            },
            rate: {
              type: 'number'
            },
            date: {
              type: 'string',
              format: 'date'
            },
            billable: {
              type: 'boolean'
            },
            approved: {
              type: 'boolean'
            }
          }
        },
        CreateSalesOrderRequest: {
          type: 'object',
          required: ['order_number', 'client', 'amount', 'order_date'],
          properties: {
            order_number: {
              type: 'string'
            },
            client: {
              type: 'string'
            },
            project_id: {
              type: 'string',
              format: 'uuid'
            },
            amount: {
              type: 'number'
            },
            status: {
              type: 'string',
              enum: ['draft', 'sent', 'accepted', 'completed', 'cancelled'],
              default: 'draft'
            },
            order_date: {
              type: 'string',
              format: 'date'
            },
            delivery_date: {
              type: 'string',
              format: 'date'
            },
            description: {
              type: 'string'
            }
          }
        },
        UpdateSalesOrderRequest: {
          type: 'object',
          properties: {
            order_number: {
              type: 'string'
            },
            client: {
              type: 'string'
            },
            project_id: {
              type: 'string',
              format: 'uuid'
            },
            amount: {
              type: 'number'
            },
            status: {
              type: 'string',
              enum: ['draft', 'sent', 'accepted', 'completed', 'cancelled']
            },
            order_date: {
              type: 'string',
              format: 'date'
            },
            delivery_date: {
              type: 'string',
              format: 'date'
            },
            description: {
              type: 'string'
            }
          }
        },
        CreatePurchaseRequest: {
          type: 'object',
          required: ['purchase_number', 'vendor', 'amount', 'order_date'],
          properties: {
            purchase_number: {
              type: 'string'
            },
            vendor: {
              type: 'string'
            },
            project_id: {
              type: 'string',
              format: 'uuid'
            },
            amount: {
              type: 'number'
            },
            status: {
              type: 'string',
              enum: ['draft', 'ordered', 'received', 'paid', 'cancelled'],
              default: 'draft'
            },
            order_date: {
              type: 'string',
              format: 'date'
            },
            delivery_date: {
              type: 'string',
              format: 'date'
            },
            description: {
              type: 'string'
            }
          }
        },
        UpdatePurchaseRequest: {
          type: 'object',
          properties: {
            purchase_number: {
              type: 'string'
            },
            vendor: {
              type: 'string'
            },
            project_id: {
              type: 'string',
              format: 'uuid'
            },
            amount: {
              type: 'number'
            },
            status: {
              type: 'string',
              enum: ['draft', 'ordered', 'received', 'paid', 'cancelled']
            },
            order_date: {
              type: 'string',
              format: 'date'
            },
            delivery_date: {
              type: 'string',
              format: 'date'
            },
            description: {
              type: 'string'
            }
          }
        },
        CreateExpenseRequest: {
          type: 'object',
          required: ['title', 'amount', 'category', 'expense_date'],
          properties: {
            title: {
              type: 'string'
            },
            amount: {
              type: 'number'
            },
            category: {
              type: 'string'
            },
            project_id: {
              type: 'string',
              format: 'uuid'
            },
            description: {
              type: 'string'
            },
            receipt_url: {
              type: 'string',
              format: 'uri'
            },
            expense_date: {
              type: 'string',
              format: 'date'
            }
          }
        },
        UpdateExpenseRequest: {
          type: 'object',
          properties: {
            title: {
              type: 'string'
            },
            amount: {
              type: 'number'
            },
            category: {
              type: 'string'
            },
            project_id: {
              type: 'string',
              format: 'uuid'
            },
            description: {
              type: 'string'
            },
            receipt_url: {
              type: 'string',
              format: 'uri'
            },
            expense_date: {
              type: 'string',
              format: 'date'
            },
            approved: {
              type: 'boolean'
            }
          }
        },
        CreateInvoiceRequest: {
          type: 'object',
          required: ['invoice_number', 'client', 'amount', 'issue_date', 'due_date'],
          properties: {
            invoice_number: {
              type: 'string'
            },
            client: {
              type: 'string'
            },
            project_id: {
              type: 'string',
              format: 'uuid'
            },
            amount: {
              type: 'number'
            },
            tax_amount: {
              type: 'number'
            },
            status: {
              type: 'string',
              enum: ['draft', 'sent', 'paid', 'overdue', 'cancelled'],
              default: 'draft'
            },
            issue_date: {
              type: 'string',
              format: 'date'
            },
            due_date: {
              type: 'string',
              format: 'date'
            },
            description: {
              type: 'string'
            }
          }
        },
        UpdateInvoiceRequest: {
          type: 'object',
          properties: {
            invoice_number: {
              type: 'string'
            },
            client: {
              type: 'string'
            },
            project_id: {
              type: 'string',
              format: 'uuid'
            },
            amount: {
              type: 'number'
            },
            tax_amount: {
              type: 'number'
            },
            status: {
              type: 'string',
              enum: ['draft', 'sent', 'paid', 'overdue', 'cancelled']
            },
            issue_date: {
              type: 'string',
              format: 'date'
            },
            due_date: {
              type: 'string',
              format: 'date'
            },
            description: {
              type: 'string'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.ts'], // Path to the API files
};

export const swaggerSpec = swaggerJsdoc(options);