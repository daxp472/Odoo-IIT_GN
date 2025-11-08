import express from 'express';
import { 
  getOverview, 
  getFinancials, 
  getUserStats 
} from '../controllers/dashboard.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { isAdminOrPM } from '../middleware/rbac.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/dashboard/overview:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Get dashboard overview metrics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard overview retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 overview:
 *                   type: object
 *                   properties:
 *                     total_projects:
 *                       type: number
 *                     active_projects:
 *                       type: number
 *                     total_revenue:
 *                       type: number
 *                     total_costs:
 *                       type: number
 *                     total_profit:
 *                       type: number
 *                     pending_invoices:
 *                       type: number
 */
router.get('/overview', verifyToken, isAdminOrPM, getOverview);

/**
 * @swagger
 * /api/dashboard/financials:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Get detailed financial metrics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Financial metrics retrieved successfully
 */
router.get('/financials', verifyToken, isAdminOrPM, getFinancials);

/**
 * @swagger
 * /api/dashboard/user-stats:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Get user statistics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: user_id
 *         in: query
 *         schema:
 *           type: string
 *         description: User ID (admin only)
 *     responses:
 *       200:
 *         description: User statistics retrieved successfully
 */
router.get('/user-stats', verifyToken, getUserStats);

export default router;