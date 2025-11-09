import { Response } from 'express';
import { supabase } from '../config/supabaseClient';
import { asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../middleware/auth.middleware';
import { CreateInvoiceRequest, UpdateInvoiceRequest } from '../models/invoice.model';
import { generateInvoicePDF as createInvoicePDF } from '../services/pdf.service';

/**
 * Get all invoices
 */
export const getInvoices = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { data: invoices, error } = await supabase
    .from('invoices')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  res.json({
    success: true,
    invoices
  });
});

/**
 * Get invoice by ID
 */
export const getInvoiceById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const { data: invoice, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return res.status(404).json({
      success: false,
      message: 'Invoice not found'
    });
  }

  res.json({
    success: true,
    invoice
  });
});

/**
 * Create new invoice
 */
export const createInvoice = asyncHandler(async (req: AuthRequest, res: Response) => {
  const invoiceData: CreateInvoiceRequest = req.body;
  
  // Calculate total amount
  const totalAmount = invoiceData.amount + (invoiceData.tax_amount || 0);

  const { data: invoice, error } = await supabase
    .from('invoices')
    .insert({
      ...invoiceData,
      total_amount: totalAmount,
      created_by: req.user!.id
    })
    .select()
    .single();

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  res.status(201).json({
    success: true,
    message: 'Invoice created successfully',
    invoice
  });
});

/**
 * Update invoice
 */
export const updateInvoice = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updateData: UpdateInvoiceRequest = req.body;

  // Recalculate total if amount or tax changed
  if (updateData.amount !== undefined || updateData.tax_amount !== undefined) {
    const { data: currentInvoice } = await supabase
      .from('invoices')
      .select('amount, tax_amount')
      .eq('id', id)
      .single();

    if (currentInvoice) {
      const newAmount = updateData.amount ?? currentInvoice.amount;
      const newTax = updateData.tax_amount ?? currentInvoice.tax_amount ?? 0;
      (updateData as any).total_amount = newAmount + newTax;
    }
  }

  const { data: invoice, error } = await supabase
    .from('invoices')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  res.json({
    success: true,
    message: 'Invoice updated successfully',
    invoice
  });
});

/**
 * Delete invoice
 */
export const deleteInvoice = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('invoices')
    .delete()
    .eq('id', id);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  res.json({
    success: true,
    message: 'Invoice deleted successfully'
  });
});

/**
 * Generate PDF for invoice
 */
export const generateInvoicePDF = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  // Fetch invoice with line items
  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', id)
    .single();

  if (invoiceError || !invoice) {
    return res.status(404).json({
      success: false,
      message: 'Invoice not found'
    });
  }

  // Fetch invoice lines
  const { data: lines, error: linesError } = await supabase
    .from('invoice_lines')
    .select('*')
    .eq('invoice_id', id);

  if (linesError) {
    console.error('Invoice lines fetch error:', linesError);
    return res.status(400).json({
      success: false,
      message: 'Failed to fetch invoice lines: ' + linesError.message
    });
  }

  // Generate PDF
  try {
    const pdfBuffer = await createInvoicePDF({ ...invoice, lines });
    
    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice.invoice_number}.pdf`);
    
    // Send PDF buffer
    res.send(pdfBuffer);
  } catch (error: any) {
    console.error('PDF Generation Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate PDF: ' + (error.message || 'Unknown error')
    });
  }
});