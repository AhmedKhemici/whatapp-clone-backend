import mongoose, {Schema} from "mongoose";

const conversations = mongoose.Schema({
    conversation_id: String,
    user_id: { type: Schema.Types.ObjectId, ref: 'users' }
},{ timestamps: true });

export default mongoose.model('conversations', conversations); 