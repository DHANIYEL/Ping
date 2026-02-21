import { Router } from "express";
import { protectedAuth } from "../middleware/auth";
import { getChatOrCreate, getChats } from "../controllers/chatController";

const router = Router();

router.use(protectedAuth)
router.get("/", getChats)
router.get("/with/:participantId", getChatOrCreate)

export default router;
