import express from "express";
import { authentication } from "../middleware/authentication.js";
import { sendMessage, syncMessages } from "../controller/messages.js";

const router = express.Router();

router.get('/messages/sync', authentication, syncMessages);
router.post('/messages/new', authentication, sendMessage);

export default router;