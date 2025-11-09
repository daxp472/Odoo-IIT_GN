interface BackendProject {
  id: string;
  name: string;
  client: string;
  start_date: string;
  end_date: string;
  description: string;
  progress: number;
  revenue: number;
  expenses: number;
  profit: number;
  status: 'active' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high';
  thumbnail?: string;
  tags: string[];
  images: string[];
  managerImage: string;
  deadline: string | null;
  tasksCount: number;
}

interface BackendTask {
  id: string;
  name: string;
  assignee: string;
  project_id: string;
  description: string;
  deadline: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
}

interface BackendSalesOrder {
  id: string;
  order_number: string;
  client: string;
  project_id?: string;
  amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'completed' | 'cancelled';
  order_date: string;
  delivery_date?: string;
  description?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
}

interface BackendPurchase {
  id: string;
  purchase_number: string;
  vendor: string;
  project_id?: string;
  amount: number;
  status: 'draft' | 'ordered' | 'received' | 'paid' | 'cancelled';
  order_date: string;
  delivery_date?: string;
  description?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
}

interface BackendExpense {
  id: string;
  title: string;
  amount: number;
  category: string;
  project_id?: string;
  description?: string;
  receipt_url?: string;
  expense_date: string;
  approved?: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
}

interface BackendInvoice {
  id: string;
  invoice_number: string;
  client: string;
  project_id?: string;
  amount: number;
  tax_amount: number;
  total_amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  issue_date: string;
  due_date: string;
  description?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
}

interface BackendTimesheet {
  id: string;
  user_id?: string;
  project_id?: string;
  task_id?: string;
  description: string;
  hours: number;
  rate?: number;
  date: string;
  billable?: boolean;
  approved?: boolean;
  created_at: string;
  updated_at: string;
}

interface BackendProduct {
  id: string;
  name: string;
  description?: string;
  category?: string;
  unit_price: number;
  currency: string;
  sku?: string;
  barcode?: string;
  unit_of_measure: string;
  tax_rate: number;
  is_active: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
}

const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    return response.json();
  },
  
  signup: async (userData: { email: string; password: string; full_name: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    return response.json();
  },
  
  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  }
};

// Dashboard API
export const dashboardAPI = {
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  },
  
  getOverview: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/overview`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  },
  
  getFinancials: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/financials`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  }
};

// Projects API
export const projectsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  },
  
  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  },
  
  create: async (projectData: BackendProject) => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData),
    });
    
    return response.json();
  },
  
  update: async (id: string, projectData: Partial<BackendProject>) => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData),
    });
    
    return response.json();
  },
  
  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    return response.json();
  }
};

// Tasks API
export const tasksAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  },
  
  getByProjectId: async (projectId: string) => {
    const response = await fetch(`${API_BASE_URL}/tasks?project_id=${projectId}`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  },
  
  create: async (taskData: BackendTask) => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(taskData),
    });
    
    return response.json();
  },
  
  update: async (id: string, taskData: Partial<BackendTask>) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(taskData),
    });
    
    return response.json();
  },
  
  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    return response.json();
  }
};

// Sales Orders API
export const salesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/sales`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  },
  
  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/sales/${id}`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  },
  
  create: async (salesOrderData: BackendSalesOrder) => {
    const response = await fetch(`${API_BASE_URL}/sales`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(salesOrderData),
    });
    
    return response.json();
  },
  
  update: async (id: string, salesOrderData: Partial<BackendSalesOrder>) => {
    const response = await fetch(`${API_BASE_URL}/sales/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(salesOrderData),
    });
    
    return response.json();
  },
  
  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/sales/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    return response.json();
  }
};

// Purchases API
export const purchasesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/purchases`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  },
  
  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/purchases/${id}`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  },
  
  create: async (purchaseData: BackendPurchase) => {
    const response = await fetch(`${API_BASE_URL}/purchases`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(purchaseData),
    });
    
    return response.json();
  },
  
  update: async (id: string, purchaseData: Partial<BackendPurchase>) => {
    const response = await fetch(`${API_BASE_URL}/purchases/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(purchaseData),
    });
    
    return response.json();
  },
  
  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/purchases/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    return response.json();
  }
};

// Expenses API
export const expensesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/expenses`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  },
  
  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  },
  
  create: async (expenseData: BackendExpense) => {
    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(expenseData),
    });
    
    return response.json();
  },
  
  update: async (id: string, expenseData: Partial<BackendExpense>) => {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(expenseData),
    });
    
    return response.json();
  },
  
  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    return response.json();
  }
};

// Invoices API
export const invoicesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/invoices`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  },
  
  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/invoices/${id}`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  },
  
  create: async (invoiceData: Omit<BackendInvoice, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'total_amount'>) => {
    const response = await fetch(`${API_BASE_URL}/invoices`, {
      method: 'POST',
      headers: getAuthHeaders(),  
      body: JSON.stringify(invoiceData),
    });
    
    return response.json();
  },
  
  update: async (id: string, invoiceData: Partial<Omit<BackendInvoice, 'id' | 'created_at' | 'updated_at' | 'created_by'>>) => {
    const response = await fetch(`${API_BASE_URL}/invoices/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(invoiceData),
    });
    
    return response.json();
  },
  
  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/invoices/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    return response.json();
  },
  
  generatePDF: async (id: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/invoices/${id}/pdf`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    return response.blob();
  }
};

// Timesheets API
export const timesheetsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/timesheets`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  },
  
  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/timesheets/${id}`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  },
  
  create: async (timesheetData: BackendTimesheet) => {
    const response = await fetch(`${API_BASE_URL}/timesheets`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(timesheetData),
    });
    
    return response.json();
  },
  
  update: async (id: string, timesheetData: Partial<BackendTimesheet>) => {
    const response = await fetch(`${API_BASE_URL}/timesheets/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(timesheetData),
    });
    
    return response.json();
  },
  
  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/timesheets/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    return response.json();
  }
};

// Products API
export const productsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  },
  
  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  },
  
  create: async (productData: Omit<BackendProduct, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    
    return response.json();
  },
  
  update: async (id: string, productData: Partial<Omit<BackendProduct, 'id' | 'created_at' | 'updated_at' | 'created_by'>>) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    
    return response.json();
  },
  
  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    return response.json();
  }
};

// Role Requests API
export const roleRequestsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/role-requests`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  },
  
  getMyRequests: async () => {
    const response = await fetch(`${API_BASE_URL}/role-requests/my`, {
      headers: getAuthHeaders(),
    });
    
    return response.json();
  },
  
  create: async (requestData: { requested_role: string; reason: string }) => {
    const response = await fetch(`${API_BASE_URL}/role-requests`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(requestData),
    });
    
    return response.json();
  },
  
  update: async (id: string, requestData: { status: 'approved' | 'rejected' }) => {
    const response = await fetch(`${API_BASE_URL}/role-requests/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(requestData),
    });
    
    return response.json();
  }
};