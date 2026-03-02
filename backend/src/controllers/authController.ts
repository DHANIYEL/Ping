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

    if (!clerkId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if user already exists
    let user = await User.findOne({ clerkId });

    // If user does NOT exist, create one
    if (!user) {
      const clerkUser = await clerkClient.users.getUser(clerkId);

      const email = clerkUser.emailAddresses[0]?.emailAddress || "";

      const username =
        clerkUser.firstName && clerkUser.lastName
          ? `${clerkUser.firstName} ${clerkUser.lastName}`
          : email.split("@")[0];

      user = await User.create({
        clerkId,
        username,
        email,
        avatar: clerkUser.imageUrl,
      });
    }

    // Always return 200
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("❌ AUTH CALLBACK ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
