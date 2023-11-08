import Messages from "../modules/messages.js";
import Conversations from "../modules/conversations.js";
import Socket from "../socket.js";

const getConversationMessages = (req, res, next) => {
    const conversation_id = req.params.conversation_id
    console.log(conversation_id);
    Messages.find({'conversation_id': conversation_id}).populate('from').then(result => {
        console.log('return all messages');
        res.status(200).send(result);
    }).catch(err => {
        console.log(err);
        next(err);
    });
}

const sendMessage = (req, res, next) => {
    const conversation_id = req.params.conversation_id
    const data = {}
    Conversations.findOne({ 'user_id': req.userId,'conversation_id': conversation_id})
    .then( (conversation) => {
        const message = req.body.message;
        const Message = new Messages({
            conversation_id: conversation.conversation_id,
            from: conversation.user_id,
            message: message
        });
        return Message.save();
    })
    .then(result => {
        console.log('Created Message');
        res.status(200).send({ "message":"Message Sent Successfully" , "result":result});
    })
    .catch(err => {
        console.log(err);
        next(err);
    });
}

export { getConversationMessages, sendMessage };
