import type { Response, NextFunction } from "express";
import { User } from "../models/User";
import type { AuthRequest } from "../middleware/auth";

export async function getUsers(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const users = await User.find({ userId: { $ne: userId } })
      .select("username email avatar")
      .limit(20);
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
}
