import express from "express";
import { sendMessage, syncMessages } from "../controler/messages.js";

const router = express.Router();

router.get('/messages/sync', syncMessages);
router.post('/messages/new', sendMessage);

export default router;