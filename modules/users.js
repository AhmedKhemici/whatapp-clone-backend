import mongoose from "mongoose";

const users = mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    timestamp: String,
});

export default mongoose.model('users', users);
export {users};