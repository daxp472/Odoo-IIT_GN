import express from 'express';
import { 
  getInvoices, 
  getInvoiceById, 
  createInvoice, 
  updateInvoice, 
  deleteInvoice,
  generateInvoicePDF
} from '../controllers/invoice.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { isAdminOrPM } from '../middleware/rbac.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     tags:
 *       - Invoices
 *     summary: Get all invoices
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Invoices retrieved successfully
 */
router.get('/', verifyToken, isAdminOrPM, getInvoices);

/**
 * @swagger
 * /api/invoices/{id}:
 *   get:
 *     tags:
 *       - Invoices
 *     summary: Get invoice by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice retrieved successfully
 *       404:
 *         description: Invoice not found
 */
router.get('/:id', verifyToken, isAdminOrPM, getInvoiceById);

/**
 * @swagger
 * /api/invoices:
 *   post:
 *     tags:
 *       - Invoices
 *     summary: Create new invoice
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateInvoiceRequest'
 *     responses:
 *       201:
 *         description: Invoice created successfully
 */
router.post('/', verifyToken, isAdminOrPM, createInvoice);

/**
 * @swagger
 * /api/invoices/{id}:
 *   put:
 *     tags:
 *       - Invoices
 *     summary: Update invoice
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateInvoiceRequest'
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 */
router.put('/:id', verifyToken, isAdminOrPM, updateInvoice);

/**
 * @swagger
 * /api/invoices/{id}:
 *   delete:
 *     tags:
 *       - Invoices
 *     summary: Delete invoice
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice deleted successfully
 */
router.delete('/:id', verifyToken, isAdminOrPM, deleteInvoice);

/**
 * @swagger
 * /api/invoices/{id}/pdf:
 *   get:
 *     tags:
 *       - Invoices
 *     summary: Generate PDF for invoice
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PDF generated successfully
 *       404:
 *         description: Invoice not found
 */
router.get('/:id/pdf', verifyToken, isAdminOrPM, generateInvoicePDF);

export default router;