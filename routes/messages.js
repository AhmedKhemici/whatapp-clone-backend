import express from "express";
import { authentication } from "../middlewares/authentication.js";
import { getConversationMessages, sendMessage } from "../controllers/messages.js";

const router = express.Router();

router.get('/conversations/:conversation_id/sync-messages', authentication, getConversationMessages);
router.post('/conversations/:conversation_id/send-message', authentication, sendMessage);

export default router;