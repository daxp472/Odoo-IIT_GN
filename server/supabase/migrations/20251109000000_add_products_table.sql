-- Add Products table for OneFlow system
-- This table will store product information that can be used in sales orders, purchases, and invoices

CREATE TABLE products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    category text,
    unit_price numeric(10,2) NOT NULL,
    currency text DEFAULT 'USD',
    sku text UNIQUE,
    barcode text,
    unit_of_measure text DEFAULT 'unit',
    tax_rate numeric(5,2) DEFAULT 0,
    is_active boolean DEFAULT true,
    image_url text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    created_by uuid REFERENCES auth.users(id) NOT NULL
);

-- Add indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_created_by ON products(created_by);
CREATE INDEX idx_products_is_active ON products(is_active);

-- Add sample products data
INSERT INTO products (name, description, category, unit_price, sku, created_by) VALUES
('Web Development Service', 'Custom web application development services', 'Services', 75.00, 'SERV-001', '550e8400-e29b-41d4-a716-446655440002'),
('Consulting Hours', 'Business consulting and strategy sessions', 'Services', 150.00, 'SERV-002', '550e8400-e29b-41d4-a716-446655440002'),
('Software License', 'Annual software license for business use', 'Software', 299.00, 'SW-001', '550e8400-e29b-41d4-a716-446655440002'),
('Cloud Hosting', 'Monthly cloud hosting services', 'Infrastructure', 99.00, 'INF-001', '550e8400-e29b-41d4-a716-446655440002'),
('Training Workshop', 'Professional training workshop session', 'Training', 499.00, 'TRN-001', '550e8400-e29b-41d4-a716-446655440002');