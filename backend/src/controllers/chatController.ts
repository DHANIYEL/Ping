import type { Request, Response, NextFunction } from "express";
import { Chat } from "../models/Chat";
import { Message } from "../models/Message";
import type { AuthRequest } from "../middleware/auth";

export async function getChats(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const chats = await Chat.find({ participantsId: userId })
      .populate("participantsId", "username email avatar")
      .populate("lastMessageId")
      .sort({ lastMessageAt: -1 });

    if (!chats) return res.status(404).json({ message: "Chats Not Found" });

    const formattedChats = chats.map((chat) => {
      const receiveParticipants = chat.participantsId.filter(
        (participant) => participant._id.toString() !== userId,
      );
      return {
        chatId: chat._id.toString(),
        participants: receiveParticipants,
        lastMessage: chat.lastMessageId,
        lastMessageAt: chat.lastMessageAt,
      };
    });

    res.status(200).json({ success: true, data: formattedChats });
  } catch (error) {
    next(error);
  }
}
export async function getChatOrCreate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
  } catch (error) {
    next(error);
  }
}
