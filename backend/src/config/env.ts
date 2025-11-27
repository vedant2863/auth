import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

// Environment variable schema with validation
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000'),
  MONGO_URI: z.string().min(1, 'MongoDB URI is required'),
  JWT_SECRET: z.string().min(8, 'JWT secret must be at least 8 characters'),
  JWT_EXPIRATION: z.string().default('1h'),
  BCRYPT_SALT_ROUNDS: z.string().default('10'),
});

const parseEnv = (): z.infer<typeof envSchema> => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err) => `${err.path.join('.')}: ${err.message}`);
      throw new Error(`Environment validation failed:\n${missingVars.join('\n')}`);
    }
    throw error;
  }
};

export const env = parseEnv();

export const config = {
  env: env.NODE_ENV,
  port: parseInt(env.PORT, 10),
  mongoUri: env.MONGO_URI,
  jwt: {
    secret: env.JWT_SECRET,
    expiration: env.JWT_EXPIRATION,
  },
  bcrypt: {
    saltRounds: parseInt(env.BCRYPT_SALT_ROUNDS, 10),
  },
  isDevelopment: env.NODE_ENV === 'development',
  isProduction: env.NODE_ENV === 'production',
};
