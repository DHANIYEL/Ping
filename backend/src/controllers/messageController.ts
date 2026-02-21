import type { Request, Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { Chat } from "../models/Chat";
import { Message } from "../models/Message";

export async function getMessages(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const chatId = req.params.chatId;

    const getChat = await Chat.findOne({
      chatId: chatId,
      participantsId: userId,
    });
    if (!getChat) return res.status(404).json({ message: "Chat Not Found" });

    const messages = await Message.find({ chatId: chatId })
      .populate("senderId", "username email avatar")
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
}
