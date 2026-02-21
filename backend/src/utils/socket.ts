import { Socket, Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import { User } from "../models/User";
import { Message } from "../models/Message";
import { Chat } from "../models/Chat";
import { verifyToken } from "@clerk/express";
interface SocketWithUserId extends Socket {
  userId: string;
}
export const initializeSocket = (httpServer: HttpServer) => {
  const io = new SocketServer(httpServer, { cors: { origin: "*" } });
  io.use(async (Socket, next) => {
    const token = Socket.handshake.auth.token;
    if (!token) return next(new Error("Unauthorized"));

    try {
      const session = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });
      const clerkId = session.sub;
      const user = await User.findOne({ clerkId });
      if (!user) return next(new Error("Unauthorized"));
      (Socket as SocketWithUserId).userId = user._id.toString();
      next();
    } catch (error: any) {
      next(error);
    }
  });
};
