import mongoose, { Schema, type Document } from "mongoose";
interface IChat extends Document {
  chatId: mongoose.Types.ObjectId;
  participantsId: mongoose.Types.ObjectId[];
  lastMessageId?: mongoose.Types.ObjectId;
  lastMessageAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new Schema<IChat>(
  {
    chatId: { type: Schema.Types.ObjectId, required: true },
    participantsId: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    lastMessageId: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      required: false,
      default: null,
    },
    lastMessageAt: { type: Date, required: false, default: Date.now },
  },
  {
    timestamps: true,
  },
);

export const Chat = mongoose.model<IChat>("Chat", ChatSchema);
