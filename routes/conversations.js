import express from "express";
import { authentication } from "../middlewares/authentication.js";
import { getRecentConversations } from "../controllers/conversations.js";

const router = express.Router();

router.get('/recent-conversations', authentication, getRecentConversations);

export default router;