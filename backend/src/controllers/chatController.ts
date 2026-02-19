import type { Request, Response, NextFunction } from "express";
import { Chat } from "../models/Chat";
import { Message } from "../models/Message";
import type { AuthRequest } from "../middleware/auth";
import mongoose from "mongoose";

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
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const participantId = new mongoose.Types.ObjectId(req.params.participantId);

    let chat = await Chat.findOne({
      participantsId: { $all: [userId, participantId] },
    })
      .populate("participantsId", "username email avatar")
      .populate("lastMessageId");

    if (!chat) {
      chat = await Chat.create({
        participantsId: [userId, participantId],
      });

      chat = await chat.populate("participantsId", "username email avatar");
    }
    const receiveParticipants = chat.participantsId.filter(
      (participant) => participant._id.toString() !== userId.toString(),
    );
    const obj = {
      chatId: chat._id.toString(),
      participants: receiveParticipants ?? null,
      lastMessage: chat.lastMessageId,
      lastMessageAt: chat.lastMessageAt,
      createdAt: chat.createdAt,
    };
    return res.status(200).json({
      success: true,
      data: obj,
    });
  } catch (error) {
    next(error);
  }
}
