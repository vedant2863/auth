import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import protectedRoutes from './routes/protectedRoutes';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './config/logger';

/**
 * Create and configure Express application
 */
export const createApp = (): Application => {
  const app = express();

  // Security middleware - sets various HTTP headers for security
  app.use(helmet());

  // CORS configuration - allow requests from frontend
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || '*', // In production, set specific frontend URL
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Body parser middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check endpoint
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: 'Server is running',
      timestamp: new Date().toISOString(),
    });
  });

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/protected', protectedRoutes);

  // 404 handler
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: 'Route not found',
    });
  });

  // Global error handler (must be last)
  app.use(errorHandler);

  logger.info('Express application configured');

  return app;
};
