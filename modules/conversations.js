import mongoose from "mongoose";
import {users} from "./users.js";

const conversations = mongoose.Schema({
    conversation_id: String,
    user: users,
    message: String,
    timestamp: String
});

export default mongoose.model('conversations', conversations); 
export {conversations};