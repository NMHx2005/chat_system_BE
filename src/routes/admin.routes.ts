import { Router } from 'express';
import { authMiddleware, requireSuperAdmin } from '../middleware/auth.middleware';
import { AdminController } from '../controllers/admin.controller.mongodb';

const router = Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Get dashboard statistics
router.get('/dashboard', AdminController.getDashboard);

// Get all users (Super Admin only)
router.get('/users', requireSuperAdmin, AdminController.getAllUsers);

// Create user (Super Admin only)
router.post('/users', requireSuperAdmin, AdminController.createUser);

// Delete user (Super Admin only)
router.delete('/users/:id', requireSuperAdmin, AdminController.deleteUser);

// Get system statistics
router.get('/stats', AdminController.getSystemStats);

// Get user activity logs
router.get('/users/:userId/activity', AdminController.getUserActivity);

// Get group statistics
router.get('/groups/stats', AdminController.getGroupStats);

// Get channel statistics
router.get('/channels/stats', AdminController.getChannelStats);

export default router;
