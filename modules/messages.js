import mongoose, {Schema} from "mongoose";

const messages = mongoose.Schema({
    conversation_id: String,
    from: { type: Schema.Types.ObjectId, ref: 'users' },
    message: String
},{ timestamps: true });

export default mongoose.model('messages', messages);