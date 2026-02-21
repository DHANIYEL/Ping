import { Router } from "express";
import { protectedAuth } from "../middleware/auth";
import { getMessages } from "../controllers/messageController";

const router = Router();

router.get("/chat/:chatId", protectedAuth, getMessages)
export default router;
