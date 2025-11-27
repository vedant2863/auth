import jwt from 'jsonwebtoken';
import { config } from '../config/env';

// JWT payload interface
export interface JWTPayload {
  userId: string;
  email: string;
}

/**
 * Generate a JWT token
 * @param payload - User data to encode in the token
 * @returns Signed JWT token
 */
export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiration,
    algorithm: 'HS256',
  });
};

/**
 * Verify and decode a JWT token
 * @param token - JWT token to verify
 * @returns Decoded payload or null if invalid
 */
export const verifyToken = (token: string): JWTPayload | null => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret, {
      algorithms: ['HS256'],
    }) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};
