import mongoose, { Schema, type Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  userId: mongoose.Types.ObjectId;
  username: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    clerkId: { type: String, required: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    avatar: { type: String, required: false, default: "" },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<IUser>("User", UserSchema);
