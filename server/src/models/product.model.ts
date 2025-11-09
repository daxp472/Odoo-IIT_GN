export interface Product {
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

export interface CreateProductRequest {
  name: string;
  description?: string;
  category?: string;
  unit_price: number;
  currency?: string;
  sku?: string;
  barcode?: string;
  unit_of_measure?: string;
  tax_rate?: number;
  is_active?: boolean;
  image_url?: string;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  is_active?: boolean;
}