import express from 'express';
import { 
  getSalesOrders, 
  getSalesOrderById, 
  createSalesOrder, 
  updateSalesOrder, 
  deleteSalesOrder 
} from '../controllers/sales.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { isAdminOrPM } from '../middleware/rbac.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/sales:
 *   get:
 *     tags:
 *       - Sales Orders
 *     summary: Get all sales orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sales orders retrieved successfully
 */
router.get('/', verifyToken, isAdminOrPM, getSalesOrders);

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     tags:
 *       - Sales Orders
 *     summary: Get sales order by ID
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
 *         description: Sales order retrieved successfully
 *       404:
 *         description: Sales order not found
 */
router.get('/:id', verifyToken, isAdminOrPM, getSalesOrderById);

/**
 * @swagger
 * /api/sales:
 *   post:
 *     tags:
 *       - Sales Orders
 *     summary: Create new sales order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSalesOrderRequest'
 *     responses:
 *       201:
 *         description: Sales order created successfully
 */
router.post('/', verifyToken, isAdminOrPM, createSalesOrder);

/**
 * @swagger
 * /api/sales/{id}:
 *   put:
 *     tags:
 *       - Sales Orders
 *     summary: Update sales order
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
 *             $ref: '#/components/schemas/UpdateSalesOrderRequest'
 *     responses:
 *       200:
 *         description: Sales order updated successfully
 */
router.put('/:id', verifyToken, isAdminOrPM, updateSalesOrder);

/**
 * @swagger
 * /api/sales/{id}:
 *   delete:
 *     tags:
 *       - Sales Orders
 *     summary: Delete sales order
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
 *         description: Sales order deleted successfully
 */
router.delete('/:id', verifyToken, isAdminOrPM, deleteSalesOrder);

export default router;