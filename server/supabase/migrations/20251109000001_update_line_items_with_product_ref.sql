-- Update line item tables to reference products table
-- This allows linking line items to specific products

-- Add product_id column to sales_order_lines
ALTER TABLE sales_order_lines 
ADD COLUMN product_id uuid REFERENCES products(id);

-- Add product_id column to purchase_lines
ALTER TABLE purchase_lines 
ADD COLUMN product_id uuid REFERENCES products(id);

-- Add product_id column to invoice_lines
ALTER TABLE invoice_lines 
ADD COLUMN product_id uuid REFERENCES products(id);

-- Update existing line items to populate item_name from product if available
-- (This would typically be done in application logic, but adding for completeness)