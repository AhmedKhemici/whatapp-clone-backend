import express from "express";
import mongoose from "mongoose";
import routeConversations from "./routes/conversations.js";
import routeMessages from "./routes/messages.js";
import routeUsers from "./routes/users.js";
import errorHandler from "./middlewares/errorHandler.js";
import Socket  from "./socket.js";
import cors from 'cors';
import dateFormatter from './utils/dateFormatter.js'

const app = express();
const port = process.env.PORT || 9000;
const prefix_v1 = '/api/v1';

app.use(express.json());
app.use(cors());
app.use( prefix_v1, routeConversations);
app.use( prefix_v1, routeMessages);
app.use( prefix_v1, routeUsers);
app.use(errorHandler);

const connection_url = 'mongodb://localhost:27017/whatsapp'

app.get("/", (req,res) => res.status(200).send("hello world"));

app.get("/api/v1/test", (req,res) => {
    const data = {
        "_id": "6546d1f60bd396fcfe6799a4",
        "conversation_id": "e7c7e577-3e19-45fa-a398-a606330d6d97",
        "user": {
            "firstName": "Ahmed",
            "lastName": "Khemici",
            "phoneNumber": "+213665824855",
            "timestamp": "1698963311343",
            "_id": "65441f6fedf833fe6693fed2",
            "__v": 0
        },
        "timestamp": "1699140086847",
        "__v": 0,
        "message": {}
    }
    console.log('//');
    dateFormatter(data);
    console.log('//');
    return res.status(200).send("hello world");
})

mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(result => {
    const server = app.listen(port,()=>console.log(`Listening on localhost:${port}`));
    const io = Socket.init(server);
    io.on('connection', socket => {
        console.log(socket.handshake.query);
        console.log('Client connected');
    });
})
.catch(err => console.log(err));
