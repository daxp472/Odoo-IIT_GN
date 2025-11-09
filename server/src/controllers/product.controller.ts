import { Response } from 'express';
import { supabase } from '../config/supabaseClient';
import { asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../middleware/auth.middleware';
import { CreateProductRequest, UpdateProductRequest } from '../models/product.model';

/**
 * Get all products
 */
export const getProducts = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  res.json({
    success: true,
    products
  });
});

/**
 * Get product by ID
 */
export const getProductById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  res.json({
    success: true,
    product
  });
});

/**
 * Create new product
 */
export const createProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const productData: CreateProductRequest = req.body;
  
  // Validate required fields
  if (!productData.name) {
    return res.status(400).json({
      success: false,
      message: 'Product name is required'
    });
  }
  
  if (productData.unit_price === undefined || productData.unit_price < 0) {
    return res.status(400).json({
      success: false,
      message: 'Valid unit price is required'
    });
  }

  // Add default values for optional fields
  const productDataWithDefaults = {
    ...productData,
    unit_price: Number(productData.unit_price),
    currency: productData.currency || 'USD',
    unit_of_measure: productData.unit_of_measure || 'unit',
    tax_rate: productData.tax_rate !== undefined ? Number(productData.tax_rate) : 0,
    is_active: productData.is_active !== undefined ? productData.is_active : true,
    created_by: req.user!.id
  };

  const { data: product, error } = await supabase
    .from('products')
    .insert(productDataWithDefaults)
    .select()
    .single();

  if (error) {
    console.error('Product creation error:', error);
    // Check if it's a rate limiting error
    if (error.message && error.message.includes('too many requests')) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please wait a moment and try again.'
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    product
  });
});

/**
 * Update product
 */
export const updateProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updateData: UpdateProductRequest = req.body;

  // Validate unit price if provided
  if (updateData.unit_price !== undefined && updateData.unit_price < 0) {
    return res.status(400).json({
      success: false,
      message: 'Unit price must be a positive number'
    });
  }

  // Prepare update data with proper types
  const updateDataWithTypes: any = { ...updateData };
  if (updateData.unit_price !== undefined) {
    updateDataWithTypes.unit_price = Number(updateData.unit_price);
  }
  if (updateData.tax_rate !== undefined) {
    updateDataWithTypes.tax_rate = Number(updateData.tax_rate);
  }
  updateDataWithTypes.updated_at = new Date().toISOString();

  const { data: product, error } = await supabase
    .from('products')
    .update(updateDataWithTypes)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Product update error:', error);
    // Check if it's a rate limiting error
    if (error.message && error.message.includes('too many requests')) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please wait a moment and try again.'
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  res.json({
    success: true,
    message: 'Product updated successfully',
    product
  });
});

/**
 * Delete product
 */
export const deleteProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Product deletion error:', error);
    // Check if it's a rate limiting error
    if (error.message && error.message.includes('too many requests')) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please wait a moment and try again.'
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  res.json({
    success: true,
    message: 'Product deleted successfully'
  });
});