export interface RoleRequest {
  id: string;
  user_id: string;
  current_role: string; // Changed from current_user_role to current_role to match database schema
  requested_role: string;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateRoleRequest {
  requested_role: string;
  reason?: string;
}

export interface UpdateRoleRequest {
  status: 'approved' | 'rejected';
}