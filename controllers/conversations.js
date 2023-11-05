import Conversations from "../modules/conversations.js";
import Messages from "../modules/messages.js";
import Users from "../modules/users.js";
import { v4 as uuidv4 } from 'uuid';

const getRecentConversations = (req, res, next) => {
    //TODO: Still hard
    const userId = req.userId;
    Conversations.find({'user._id':userId}).sort('timestamp')
    .then( (userConversations) =>{
        res.status(200).send({'message': 'Recent Conversations', conversations: userConversations});   
    }).catch( (err) =>{
        console.log(err);
        next(err);
    });
}

const createConversation = (req, res, next) => {
    const conversation_id = uuidv4();
    const timestamp = Date.now();
    Users.findById(req.userId)
    .then( (result)=>{
        const from_conversation = new Conversations({
            conversation_id: conversation_id, 
            user: result,
            timestamp: timestamp
        });
        return from_conversation.save();
    })
    .then( () =>{
        return Users.findById(req.body.to)
    })
    .then( (result) =>{
        const to_conversation = new Conversations({
            conversation_id: conversation_id, 
            user: result,
            timestamp: timestamp
        });
        to_conversation.save();
        res.status(200).send({'message': 'Conversations was Created Successfully', conversations_id: conversation_id}); 
    })  
    .catch((err) => {
        console.log(err);
        next(err);
    })
}


export { getRecentConversations, createConversation };
