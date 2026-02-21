import mongoose, { Schema, type Document } from "mongoose";

interface IMessage extends Document {
  chatId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    chatId: { type: Schema.Types.ObjectId, required: true, ref: "Chat" },
    senderId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    content: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  },
);
MessageSchema.index({ chatId: 1, createdAt: -1 });

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
