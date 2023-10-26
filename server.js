//  importig
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import { Server }  from "socket.io";


//  app config
const app = express();
const port = process.env.PORT || 9000

//  middleware
app.use(express.json());

//  DB config
const connection_url = 'mongodb://localhost:27017/whatsapp'




//  ?????

//  api routes
app.get("/",(req,res) => res.status(200).send("hello world"));

app.get('/api/v1/messages/sync', (req, res) => {
    Messages.find({}).then(result => {
        console.log('return all messages');
        res.status(201).send(result);
    }).catch(err => {
        console.log(err);
        res.status(500).send(err)
    });
})

app.post('/api/v1/messages/new', (req, res) => {
    const dbMessage = req.body;
    const Message = new Messages(dbMessage);
    Message.save().then(result => {
        console.log('Created Message');
        res.status(201).send(`new message create: \n ${result}`)
    }).catch(err => {
        console.log(err);
        res.status(500).send(err)
    });
})

//  listen

mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(result => {
    const server = app.listen(port,()=>console.log(`Listening on localhost:${port}`));
    const io = new Server(server);
    io.on('connection', socket => {
        console.log('Client connected');
    });
})
.catch(err => console.log(err));
