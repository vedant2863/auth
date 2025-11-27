import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { User } from '../models/User';
import { validate } from '../middleware/validate';
import { registerSchema, loginSchema } from '../validators/authValidators';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { logger } from '../config/logger';

const router: Router = Router();

// Rate limiter for auth routes (10 requests per 15 minutes per IP)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post(
  '/register',
  authLimiter,
  validate(registerSchema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, dob, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(409).json({
          success: false,
          message: 'User with this email already exists',
        });
        return;
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create new user
      const user = await User.create({
        name,
        dob,
        email,
        password: hashedPassword,
      });

      // Generate JWT token
      const token = generateToken({
        userId: user._id.toString(),
        email: user.email,
      });

      logger.info('User registered successfully', { email: user.email });

      // Return user data without password
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          dob: user.dob,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      logger.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during registration',
      });
    }
  }
);

/**
 * POST /api/auth/login
 * Login an existing user
 */
router.post(
  '/login',
  authLimiter,
  validate(loginSchema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
        return;
      }

      // Verify password
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
        return;
      }

      // Generate JWT token
      const token = generateToken({
        userId: user._id.toString(),
        email: user.email,
      });

      logger.info('User logged in successfully', { email: user.email });

      // Return user data without password
      res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          dob: user.dob,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      logger.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during login',
      });
    }
  }
);

export default router;
