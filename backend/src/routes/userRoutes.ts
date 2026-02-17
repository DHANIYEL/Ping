import { Router } from "express";
import { protectedAuth } from "../middleware/auth";
import { getUsers } from "../controllers/userController";

const router = Router();

router.get("/", protectedAuth, getUsers);
export default router;
