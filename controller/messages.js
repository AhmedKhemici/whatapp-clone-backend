import Messages from "../module/messages.js";
import Socket from "../socket.js";

const syncMessages = (req, res, next) => {
    console.log("syncMessages");
    Messages.find({}).then(result => {
        console.log('return all messages');
        res.status(201).send(result);
    }).catch(err => {
        console.log(err);
        next(err);
    });
}

const sendMessage = (req, res) => {
    const data = req.body;
    const Message = new Messages(data);
    Message.save().then(result => {
        console.log('Created Message');
        res.status(201).send(`new message create: \n ${result}`)
    }).catch(err => {
        console.log(err);
        next(err);
    });
}

export { sendMessage, syncMessages };
