import express from 'express';
import { 
  getPurchases, 
  getPurchaseById, 
  createPurchase, 
  updatePurchase, 
  deletePurchase 
} from '../controllers/purchase.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { isAdminOrPM } from '../middleware/rbac.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/purchases:
 *   get:
 *     tags:
 *       - Purchases
 *     summary: Get all purchases
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Purchases retrieved successfully
 */
router.get('/', verifyToken, isAdminOrPM, getPurchases);

/**
 * @swagger
 * /api/purchases/{id}:
 *   get:
 *     tags:
 *       - Purchases
 *     summary: Get purchase by ID
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
 *         description: Purchase retrieved successfully
 *       404:
 *         description: Purchase not found
 */
router.get('/:id', verifyToken, isAdminOrPM, getPurchaseById);

/**
 * @swagger
 * /api/purchases:
 *   post:
 *     tags:
 *       - Purchases
 *     summary: Create new purchase
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePurchaseRequest'
 *     responses:
 *       201:
 *         description: Purchase created successfully
 */
router.post('/', verifyToken, isAdminOrPM, createPurchase);

/**
 * @swagger
 * /api/purchases/{id}:
 *   put:
 *     tags:
 *       - Purchases
 *     summary: Update purchase
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
 *             $ref: '#/components/schemas/UpdatePurchaseRequest'
 *     responses:
 *       200:
 *         description: Purchase updated successfully
 */
router.put('/:id', verifyToken, isAdminOrPM, updatePurchase);

/**
 * @swagger
 * /api/purchases/{id}:
 *   delete:
 *     tags:
 *       - Purchases
 *     summary: Delete purchase
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
 *         description: Purchase deleted successfully
 */
router.delete('/:id', verifyToken, isAdminOrPM, deletePurchase);

export default router;