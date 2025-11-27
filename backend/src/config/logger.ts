import winston from 'winston';
import { config } from './env';

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Console format for development
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
    return `${timestamp} [${level}]: ${message} ${metaStr}`;
  })
);

// Create logger instance
export const logger = winston.createLogger({
  level: config.isDevelopment ? 'debug' : 'info',
  format: logFormat,
  defaultMeta: { service: 'mern-auth-backend' },
  transports: [
    new winston.transports.Console({
      format: config.isDevelopment ? consoleFormat : logFormat,
    }),
  ],
  exitOnError: false,
});
