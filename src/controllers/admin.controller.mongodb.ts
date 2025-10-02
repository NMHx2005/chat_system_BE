import { Request, Response } from 'express';
import { requireSuperAdmin } from '../middleware/auth.middleware';
import { adminService } from '@/services/admin.service';

export class AdminController {
    /**
     * Get dashboard statistics
     */
    static async getDashboard(req: Request, res: Response): Promise<void> {
        try {
            const stats = await adminService.getDashboardStats();

            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            console.error('Error getting dashboard stats:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    /**
     * Get all users (Super Admin only)
     */
    static async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const { page = 1, limit = 10, search } = req.query;

            const users = await adminService.getAllUsers({
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                search: search as string
            });

            res.json({
                success: true,
                data: users
            });
        } catch (error) {
            console.error('Error getting all users:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    /**
     * Create user (Super Admin only)
     */
    static async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { username, email, password, roles } = req.body;

            if (!username || !email || !password) {
                res.status(400).json({
                    success: false,
                    message: 'Username, email, and password are required'
                });
                return;
            }

            const user = await adminService.createUser({
                username,
                email,
                password,
                roles: roles || ['user']
            });

            res.status(201).json({
                success: true,
                data: user
            });
        } catch (error: any) {
            console.error('Error creating user:', error);
            if (error.message.includes('duplicate')) {
                res.status(409).json({
                    success: false,
                    message: 'User already exists'
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
            }
        }
    }

    /**
     * Delete user (Super Admin only)
     */
    static async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({
                    success: false,
                    message: 'User ID is required'
                });
                return;
            }

            const deleted = await adminService.deleteUser(id);

            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
                return;
            }

            res.json({
                success: true,
                message: 'User deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    /**
     * Get system statistics
     */
    static async getSystemStats(req: Request, res: Response): Promise<void> {
        try {
            const stats = await adminService.getSystemStats();

            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            console.error('Error getting system stats:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    /**
     * Get user activity logs
     */
    static async getUserActivity(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            if (!userId) {
                res.status(400).json({
                    success: false,
                    message: 'User ID is required'
                });
                return;
            }
            const { limit = 50, offset = 0 } = req.query;

            const activities = await adminService.getUserActivity(
                userId,
                parseInt(limit as string),
                parseInt(offset as string)
            );

            res.json({
                success: true,
                data: activities
            });
        } catch (error) {
            console.error('Error getting user activity:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    /**
     * Get group statistics
     */
    static async getGroupStats(req: Request, res: Response): Promise<void> {
        try {
            const stats = await adminService.getGroupStats();

            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            console.error('Error getting group stats:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    /**
     * Get channel statistics
     */
    static async getChannelStats(req: Request, res: Response): Promise<void> {
        try {
            const stats = await adminService.getChannelStats();

            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            console.error('Error getting channel stats:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}
