import mongoose, {Schema} from "mongoose";

const authentications = mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'users' },
    password: String, 
},{ timestamps: true });

export default mongoose.model('authentications', authentications);