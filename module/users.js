import mongoose from "mongoose";

const users = mongoose.Schema({
    name: String,
    password: String
});

export default mongoose.model('users', users);