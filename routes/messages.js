import express from "express";
import { authentication } from "../middlewares/authentication.js";
import { getConversationMessages, sendMessage } from "../controllers/messages.js";

const router = express.Router();

router.get('/conversations/:conversation_id/messages/sync', authentication, getConversationMessages);
router.post('/messages/new', authentication, sendMessage);

export default router;