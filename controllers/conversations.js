import Conversations from "../modules/conversations.js";
import Messages from "../modules/messages.js";
import Users from "../modules/users.js";
import { v4 as uuidv4 } from 'uuid';

const  getRecentConversations = async (req, res, next) => {
    const userId = req.userId;
    let conversations = await Conversations.find({'user._id':userId}).lean().sort('timestamp').exec();
    conversations = await Promise.all(conversations.map( async (conversation) =>{
        const message = await Messages.findOne({'conversation.conversation_id':conversation.conversation_id}).lean().sort('timestamp').exec();
        conversation.message = message;
        return conversation;
    }));
    res.status(200).send({'message': 'Recent Conversations', conversations: conversations});   
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
