import { Router } from "express";
import { protectedAuth } from "../middleware/auth";
import { getMe } from "../controllers/authController";

const router = Router();

router.get("/me", protectedAuth, getMe);

export default router;
