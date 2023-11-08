import mongoose from "mongoose";

const users = mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String
},{ timestamps: true });

export default mongoose.model('users', users);