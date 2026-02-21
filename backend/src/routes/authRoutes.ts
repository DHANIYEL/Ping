import { Router } from "express";
import { protectedAuth } from "../middleware/auth";
import { authCallback, getMe } from "../controllers/authController";

const router = Router();

router.get("/me", protectedAuth, getMe);
router.post("/callback", authCallback);
router.get("/test", (req, res) => res.send("Hello, world!"));
export default router;
