import { userService } from './user.service';
import { groupService } from './group.service';
import { channelService } from './channel.service';
import { messageService } from './message.service';

export interface DashboardStats {
    totalUsers: number;
    totalGroups: number;
    totalChannels: number;
    totalMessages: number;
    activeUsers: number;
    recentActivity: any[];
}

export interface SystemStats {
    users: {
        total: number;
        active: number;
        inactive: number;
        newThisWeek: number;
    };
    groups: {
        total: number;
        active: number;
        inactive: number;
    };
    channels: {
        total: number;
        active: number;
        inactive: number;
    };
    messages: {
        total: number;
        today: number;
        thisWeek: number;
    };
    storage: {
        totalFiles: number;
        totalSize: number;
    };
}

export interface UserActivity {
    _id: string;
    userId: string;
    action: string;
    details: any;
    timestamp: Date;
}

export class AdminService {
    /**
     * Get dashboard statistics
     */
    async getDashboardStats(): Promise<DashboardStats> {
        try {
            const [totalUsers, totalGroups, totalChannels, totalMessages] = await Promise.all([
                userService.countUsers(),
                groupService.countGroups(),
                channelService.countChannels(),
                messageService.countMessages()
            ]);

            const activeUsers = await userService.countActiveUsers();
            const recentActivity = await this.getRecentActivity();

            return {
                totalUsers,
                totalGroups,
                totalChannels,
                totalMessages,
                activeUsers,
                recentActivity
            };
        } catch (error) {
            console.error('Error getting dashboard stats:', error);
            throw error;
        }
    }

    /**
     * Get all users with pagination and search
     */
    async getAllUsers(options: {
        page: number;
        limit: number;
        search?: string;
    }) {
        try {
            return await userService.getAllUsers(options);
        } catch (error) {
            console.error('Error getting all users:', error);
            throw error;
        }
    }

    /**
     * Create user
     */
    async createUser(userData: {
        username: string;
        email: string;
        password: string;
        roles: string[];
    }) {
        try {
            return await userService.create(userData);
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    /**
     * Delete user
     */
    async deleteUser(userId: string) {
        try {
            return await userService.delete(userId);
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    /**
     * Get system statistics
     */
    async getSystemStats(): Promise<SystemStats> {
        try {
            const [users, groups, channels, messages] = await Promise.all([
                this.getUserStats(),
                this.getGroupStats(),
                this.getChannelStats(),
                this.getMessageStats()
            ]);

            return {
                users,
                groups,
                channels,
                messages,
                storage: {
                    totalFiles: 0, // TODO: Implement file counting
                    totalSize: 0   // TODO: Implement size calculation
                }
            };
        } catch (error) {
            console.error('Error getting system stats:', error);
            throw error;
        }
    }

    /**
     * Get user activity logs
     */
    async getUserActivity(userId: string, limit: number, offset: number): Promise<UserActivity[]> {
        try {
            // TODO: Implement user activity logging
            return [];
        } catch (error) {
            console.error('Error getting user activity:', error);
            throw error;
        }
    }

    /**
     * Get group statistics
     */
    async getGroupStats() {
        try {
            const total = await groupService.countGroups();
            const active = await groupService.countActiveGroups();

            return {
                total,
                active,
                inactive: total - active
            };
        } catch (error) {
            console.error('Error getting group stats:', error);
            throw error;
        }
    }

    /**
     * Get channel statistics
     */
    async getChannelStats() {
        try {
            const total = await channelService.countChannels();
            const active = await channelService.countActiveChannels();

            return {
                total,
                active,
                inactive: total - active
            };
        } catch (error) {
            console.error('Error getting channel stats:', error);
            throw error;
        }
    }

    /**
     * Get user statistics
     */
    private async getUserStats() {
        try {
            const total = await userService.countUsers();
            const active = await userService.countActiveUsers();
            const newThisWeek = await userService.countNewUsersThisWeek();

            return {
                total,
                active,
                inactive: total - active,
                newThisWeek
            };
        } catch (error) {
            console.error('Error getting user stats:', error);
            throw error;
        }
    }

    /**
     * Get message statistics
     */
    private async getMessageStats() {
        try {
            const total = await messageService.countMessages();
            const today = await messageService.countMessagesToday();
            const thisWeek = await messageService.countMessagesThisWeek();

            return {
                total,
                today,
                thisWeek
            };
        } catch (error) {
            console.error('Error getting message stats:', error);
            throw error;
        }
    }

    /**
     * Get recent activity
     */
    private async getRecentActivity() {
        try {
            // TODO: Implement recent activity tracking
            return [];
        } catch (error) {
            console.error('Error getting recent activity:', error);
            throw error;
        }
    }
}

export const adminService = new AdminService();
