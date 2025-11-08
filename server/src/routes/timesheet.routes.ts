import express from 'express';
import { 
  getTimesheets, 
  createTimesheet, 
  updateTimesheet, 
  deleteTimesheet 
} from '../controllers/timesheet.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/timesheets:
 *   get:
 *     tags:
 *       - Timesheets
 *     summary: Get timesheets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: project_id
 *         in: query
 *         schema:
 *           type: string
 *       - name: user_id
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Timesheets retrieved successfully
 */
router.get('/', verifyToken, getTimesheets);

/**
 * @swagger
 * /api/timesheets:
 *   post:
 *     tags:
 *       - Timesheets
 *     summary: Create timesheet entry
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTimesheetRequest'
 *     responses:
 *       201:
 *         description: Timesheet entry created successfully
 */
router.post('/', verifyToken, createTimesheet);

/**
 * @swagger
 * /api/timesheets/{id}:
 *   put:
 *     tags:
 *       - Timesheets
 *     summary: Update timesheet entry
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
 *             $ref: '#/components/schemas/UpdateTimesheetRequest'
 *     responses:
 *       200:
 *         description: Timesheet entry updated successfully
 */
router.put('/:id', verifyToken, updateTimesheet);

/**
 * @swagger
 * /api/timesheets/{id}:
 *   delete:
 *     tags:
 *       - Timesheets
 *     summary: Delete timesheet entry
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
 *         description: Timesheet entry deleted successfully
 */
router.delete('/:id', verifyToken, deleteTimesheet);

export default router;