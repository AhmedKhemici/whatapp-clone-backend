import mongoose from "mongoose";

//TODO: update this file
const whatsappSchema = mongoose.Schema({
    from: String,
    to: String,
    message: String,
    timestamp: String,
});

export default mongoose.model('userMessages', whatsappSchema);