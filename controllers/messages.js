import Messages from "../modules/messages.js";
import Conversations from "../modules/conversations.js";
import Users from "../modules/users.js";
import Socket from "../socket.js";

const getConversationMessages = (req, res, next) => {
    const conversation_id = req.params.conversation_id
    Messages.find({'conversation.conversation_id': conversation_id}).then(result => {
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
    Users.findOne({_id: req.userId})
    .then( from_user => {
        data.from_user = from_user;
        const to_user = Users.findOne({_id: req.body.to});
        return to_user;
    })
    .then( (to_user) => {
        data.to_user = to_user;
        const conversation = Conversations.findOne({ 'user._id': req.userId,'conversation_id': conversation_id});
        return conversation;
    })
    .then( (conversation) => {
        data.conversation = conversation;
        const message = req.body.message;
        const timestamp = Date.now();
        const Message = new Messages({
            conversation: data.conversation,
            from: data.from_user,
            to: data.to_user,
            message: message,
            timestamp: timestamp
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
