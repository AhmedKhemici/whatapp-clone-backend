import Conversations from "../modules/conversations.js";
import Messages from "../modules/messages.js";
import Users from "../modules/users.js";
import { v4 as uuidv4 } from 'uuid';

const  getRecentConversations = async (req, res, next) => {
    const userId = req.userId;
    let conversations = await Conversations.find({'user_id':userId}).lean().sort({createdAt:1}).exec();
    conversations = await Promise.all(conversations.map( async (conversation) =>{
        const users = await Conversations.find({'user_id':{$ne:userId},'conversation_id':conversation.conversation_id}).select('user_id').populate('user_id').lean().exec();
        const message = await Messages.findOne({'conversation_id':conversation.conversation_id}).select('from message createdAt').populate('from').lean().sort({createdAt:'desc'}).exec();
        conversation.users = users;
        conversation.message = message;
        return conversation;
    }));
    res.status(200).send({'message': 'Recent Conversations', conversations: conversations});   
}

const createConversation = (req, res, next) => {
    const conversation_id = uuidv4();
    Users.findById(req.userId)
    .then( (result)=>{
        const from_conversation = new Conversations({
            conversation_id: conversation_id, 
            user_id: result._id
        });
        return from_conversation.save();
    })
    .then( () =>{
        return Users.findById(req.body.to)
    })
    .then( (result) =>{
        const to_conversation = new Conversations({
            conversation_id: conversation_id, 
            user_id: result._id
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
