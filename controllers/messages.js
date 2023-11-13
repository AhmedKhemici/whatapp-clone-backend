import Messages from "../modules/messages.js";
import Conversations from "../modules/conversations.js";
import { getIO } from "../services/socketService.js";

const getConversationMessages = (req, res, next) => {
    const conversation_id = req.params.conversation_id
    Messages.find({'conversation_id': conversation_id}).populate('from').then(result => {
        res.status(200).send(result);
    }).catch(err => {
        console.log(err);
        next(err);
    });
}

const sendMessage = (req, res, next) => {
    const conversation_id = req.params.conversation_id
    const to = req.body.to
    Conversations.findOne({ 'user_id': req.userId,'conversation_id': conversation_id})
    .then( (conversation) => {
        const message = req.body.message;
        const Message = new Messages({
            conversation_id: conversation.conversation_id,
            from: req.userId,
            message: message
        });
        return Message.save();
    })
    .then(result => {
        const socketData = {
            _id: conversation_id,
            from:{
                _id: result.from._id,
                firstName: result.from.firstName,
                lastName: result.from.lastName,
                phoneNumber: result.from.phoneNumber
            },
            message: result.message,
            createdAt: result.createdAt
        }
        getIO().to(to.toString()).emit('message_received', socketData);
        res.status(200).send({ "message":"Message Sent Successfully" , "result":result});
    })
    .catch(err => {
        console.log(err);
        next(err);
    });
}

export { getConversationMessages, sendMessage };
