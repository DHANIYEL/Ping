import type { Request, Response, NextFunction } from "express";
import { getAuth, requireAuth } from "@clerk/express";
import { User } from "../models/User";

export type AuthRequest = Request & { userId?: string };
export const protectedAuth = [
  requireAuth(),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { userId: clerkId } = getAuth(req);
      if (!clerkId)
        return res
          .status(401)
          .json({ messageS: "Unauthorized - Invalid Token" });

      const user = await User.findOne({ clerkId });
      if (!user) return res.status(404).json({ message: "User Not Found" });
      req.userId = user._id.toString();
      next();
    } catch (error) {
      console.log("❌ Error authenticating user in protected route", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
