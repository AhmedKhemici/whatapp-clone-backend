import Conversations from "../modules/conversations.js";
import Users from "../modules/users.js";
import { v4 as uuidv4 } from 'uuid';

const getRecentConversations = (req, res, next) => {
    const userId = req.userId;
    Conversations.find({'user._id':userId}).sort('timestamp');
    //This Needs a Complex Query Not Hard , but needs some thinking 
}

const createConversation = (req, res, next) => {
    try{
        const conversation_id = uuidv4();
        const timestamp = Date.now();
        const from_user = Users.findOne({_id : req.userId})    
        const to_user = Users.findOne({_id : req.body.to})  
        const from_conversation = new Conversations({
            conversation_id: conversation_id, 
            user: from_user,
            timestamp: timestamp
        });
        const to_conversation = new Conversations({
            conversation_id: conversation_id, 
            user: to_user,
            timestamp: timestamp
        });
        res.status(200).send({'message': 'Conversations was Created Successfully', conversations: [from_conversation, to_conversation]});    
    }catch(err){
        console.log(err);
        next(err);
    }
}

export { getRecentConversations, createConversation };
