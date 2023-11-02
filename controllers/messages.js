import Messages from "../modules/messages.js";
import Conversations from "../modules/conversations.js";
import Socket from "../socket.js";

const getConversationMessages = (req, res, next) => {
    const conversation_id = req.params.conversation_id
    Messages.find({'conversations.conversation_id': conversation_id}).then(result => {
        console.log('return all messages');
        res.status(201).send(result);
    }).catch(err => {
        console.log(err);
        next(err);
    });
}

const sendMessage = (req, res) => {
    const data = req.body;
    const conversation_id = data.conversation_id
    if (!conversation_id){
        Conversations.save().then(result => {
            //To and From User
        }).catch(err => {
            console.log(err);
            next(err);
        });
    }
    const Message = new Messages( {...data, conversations: ''});
    Message.save().then(result => {
        console.log('Created Message');
        res.status(201).send(`new message create: \n ${result}`)
    }).catch(err => {
        console.log(err);
        next(err);
    });
}

export { getConversationMessages, sendMessage };
