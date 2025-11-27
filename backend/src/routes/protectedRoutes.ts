import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import { User } from '../models/User';
import { logger } from '../config/logger';

const router: Router = Router();

// Apply authentication middleware to all routes in this router
router.use(authenticate);

/**
 * GET /api/protected/users
 * Get all users (protected route)
 * Returns a list of users or static data for demonstration
 */
router.get('/users', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info('Protected users endpoint accessed', { userId: req.user?.userId });

    // Fetch all users from database (excluding password)
    const users = await User.find({}, '-password').sort({ createdAt: -1 }).limit(50);

    // If no users found, return static demo data
    if (users.length === 0) {
      res.status(200).json({
        success: true,
        message: 'Static demo data (no users in database yet)',
        users: [
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            dob: '1990-01-15',
            createdAt: new Date().toISOString(),
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            dob: '1992-05-22',
            createdAt: new Date().toISOString(),
          },
          {
            id: '3',
            name: 'Bob Johnson',
            email: 'bob@example.com',
            dob: '1988-11-30',
            createdAt: new Date().toISOString(),
          },
        ],
      });
      return;
    }

    // Return actual users from database
    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      users: users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        dob: user.dob,
        createdAt: user.createdAt,
      })),
    });
  } catch (error) {
    logger.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users',
    });
  }
});

/**
 * GET /api/protected/profile
 * Get current user profile (protected route)
 */
router.get('/profile', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    const user = await User.findById(userId, '-password');

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        dob: user.dob,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    logger.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile',
    });
  }
});

export default router;
