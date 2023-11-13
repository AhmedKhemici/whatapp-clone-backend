import express from "express";
import mongoose from "mongoose";
import routeConversations from "./routes/conversations.js";
import routeMessages from "./routes/messages.js";
import routeUsers from "./routes/users.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from 'cors';
import { socketConnect } from "./services/socketService.js";
import { socketAuth } from "./middlewares/authentication.js";
import { Server } from "socket.io";

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

mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(result => {
    const server = app.listen(port,()=>console.log(`Listening on localhost:${port}`));
    const io = new Server(server, {cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }});
    socketConnect(io, socketAuth);
})
.catch(err => console.log(err));
