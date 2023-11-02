import mongoose from "mongoose";
import { users } from "./users.js";

const authentications = mongoose.Schema({
    user: users,
    password: String, 
    timestamp: String
});

export default mongoose.model('authentications', authentications);
export {authentications};