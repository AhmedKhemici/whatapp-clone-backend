import express from "express";
import { authentication } from "../middlewares/authentication.js";
import { getRecentConversations, createConversation } from "../controllers/conversations.js";

const router = express.Router();

router.get('/recent-conversations', authentication, getRecentConversations);
router.post('/create-conversation', authentication, createConversation);

export default router;