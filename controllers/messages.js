import Messages from "../modules/messages.js";
import Conversations from "../modules/conversations.js";
import Users from "../modules/users.js";
import Socket from "../socket.js";

const getConversationMessages = (req, res, next) => {
    const conversation_id = req.params.conversation_id
    Messages.find({'conversations.conversation_id': conversation_id}).then(result => {
        console.log('return all messages');
        res.status(200).send(result);
    }).catch(err => {
        console.log(err);
        next(err);
    });
}

const sendMessage = (req, res, next) => {
    const conversation_id = req.body.conversation_id
    const from = Users.findOne({_id: req.userId})
    .catch(err => {
        console.log(err);
        next(err);
    });
    const to = Users.findOne({_id: req.body.from})
    .catch(err => {
        console.log(err);
        next(err);
    });
    const message = req.body.message;
    const timestamp = Date.now();
    Conversations.findOne({ 'user._id': req.userId,'conversation_id': conversation_id})
    .then((result) => {
        const Message = new Messages({
            conversation_id: result,
            from: from,
            to: to,
            message: message,
            timestamp: timestamp
        });
        return Message.save();
    })
    .then(result => {
        console.log('Created Message');
        res.status(200).send(`new message create: \n ${result}`)
    }).catch(err => {
        console.log(err);
        next(err);
    });
}

export { getConversationMessages, sendMessage };
