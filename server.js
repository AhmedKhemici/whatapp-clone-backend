import express from "express";
import mongoose from "mongoose";
import route from "./Routes/messages.js";
import Server  from "./socket.js";
import cors from 'cors';

const app = express();
const port = process.env.PORT || 9000

app.use(express.json());
app.use(cors());
app.use('/api/v1', route);

const connection_url = 'mongodb://localhost:27017/whatsapp'

app.get("/", (req,res) => res.status(200).send("hello world"));

mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(result => {
    const server = app.listen(port,()=>console.log(`Listening on localhost:${port}`));
    const io = Server.init(server);
    io.on('connection', socket => {
        console.log('Client connected');
    });
})
.catch(err => console.log(err));
