import type { Response, Request, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { User } from "../models/User";
import { clerkClient, getAuth } from "@clerk/express";
import mongoose from "mongoose";

// Add Next() later
export async function getMe(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const user = await User.findById({ userId });

    if (!user) return res.status(404).json({ message: "User Not Found" });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500);
    next(error);
  }
}

export async function authCallback(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId: clerkId } = getAuth(req);
    if (!clerkId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findOne({ clerkId });
    if (!user) {
      // Get user from clerk & save in db if not found
      const getClerkUser = await clerkClient.users.getUser(clerkId);

      const email = getClerkUser.emailAddresses[0]?.emailAddress || "";

      const username =
        getClerkUser.firstName && getClerkUser.lastName
          ? `${getClerkUser.firstName} ${getClerkUser.lastName}`
          : email.split("@")[0];
      const obj = {
        clerkId,
        username,
        email,
        avatar: getClerkUser.imageUrl,
      };

      const insertUser = await User.create(obj);
      if (insertUser) {
        res.status(200).json({ success: true, data: obj });
      }
    } else {
      res.status(500).json({ message: "User already exists" });
    }
  } catch (error) {
    res.status(500);
    next(error);
  }
}
