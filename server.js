//  importig
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";


//  app config
const app = express();
const port = process.env.PORT || 9000

//  middleware
app.use(express.json());

//  DB config
const connection_url = 'mongodb://localhost:27017/whatsapp'


mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//  ?????

//  api routes
app.get("/",(req,res) => res.status(200).send("hello world"));

app.post('/api/v1/messages/new', (req, res) => {
    const dbMessage = req.body;
    // Messages.create(dbMessage, (err, data) => {
    //     if (err) {
    //         res.status(500).send(err)
    //     } else {
    //         res.status(201).send(`new message create: \n ${data}`)
    //     }
    // })
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
app.listen(port,()=>console.log(`Listening on localhost:${port}`));