import mongoose, { Document, Schema } from 'mongoose';

// User interface for TypeScript
export interface IUser extends Document {
  name: string;
  dob: Date;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// User schema definition
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name must not exceed 100 characters'],
    },
    dob: {
      type: Date,
      required: [true, 'Date of birth is required'],
      validate: {
        validator: function (value: Date) {
          // Must be a valid date and not in the future
          return value instanceof Date && !isNaN(value.getTime()) && value < new Date();
        },
        message: 'Date of birth must be a valid date in the past',
      },
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value: string) {
          // Basic email validation
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Please provide a valid email address',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
  },
  {
    timestamps: true,
  }
);


// Export the User model
export const User = mongoose.model<IUser>('User', userSchema);
