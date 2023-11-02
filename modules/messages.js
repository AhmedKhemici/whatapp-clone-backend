import mongoose from "mongoose";
import { conversations } from "./conversations.js";
import { users } from "./users.js";

const messages = mongoose.Schema({
    conversation: conversations,
    from: users,
    to: users,
    message: String,
    timestamp: String
});

export default mongoose.model('messages', messages);