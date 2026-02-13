import mongoose, { Schema, type Document } from "mongoose";

interface IMessage extends Document {
  messageId: mongoose.Types.ObjectId;
  chatId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    messageId: { type: Schema.Types.ObjectId, required: true },
    chatId: { type: Schema.Types.ObjectId, required: true, ref: "Chat" },
    senderId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
