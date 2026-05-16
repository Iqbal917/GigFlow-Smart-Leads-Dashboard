import mongoose from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  SALES = 'sales'
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.SALES
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUser>(
  'User',
  userSchema
);