import express from 'express';
import { 
  getExpenses, 
  getExpenseById, 
  createExpense, 
  updateExpense, 
  deleteExpense 
} from '../controllers/expense.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     tags:
 *       - Expenses
 *     summary: Get all expenses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Expenses retrieved successfully
 */
router.get('/', verifyToken, getExpenses);

/**
 * @swagger
 * /api/expenses/{id}:
 *   get:
 *     tags:
 *       - Expenses
 *     summary: Get expense by ID
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
 *         description: Expense retrieved successfully
 *       404:
 *         description: Expense not found
 */
router.get('/:id', verifyToken, getExpenseById);

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     tags:
 *       - Expenses
 *     summary: Create new expense
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateExpenseRequest'
 *     responses:
 *       201:
 *         description: Expense created successfully
 */
router.post('/', verifyToken, createExpense);

/**
 * @swagger
 * /api/expenses/{id}:
 *   put:
 *     tags:
 *       - Expenses
 *     summary: Update expense
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
 *             $ref: '#/components/schemas/UpdateExpenseRequest'
 *     responses:
 *       200:
 *         description: Expense updated successfully
 */
router.put('/:id', verifyToken, updateExpense);

/**
 * @swagger
 * /api/expenses/{id}:
 *   delete:
 *     tags:
 *       - Expenses
 *     summary: Delete expense
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
 *         description: Expense deleted successfully
 */
router.delete('/:id', verifyToken, deleteExpense);

export default router;