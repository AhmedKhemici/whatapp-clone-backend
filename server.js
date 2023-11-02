import express from "express";
import mongoose from "mongoose";
import routeMessages from "./routes/messages.js";
import routeUsers from "./routes/users.js";
import errorHandler from "./middlewares/errorHandler.js";
import Socket  from "./socket.js";
import cors from 'cors';

const app = express();
const port = process.env.PORT || 9000

app.use(express.json());
app.use(cors());
app.use('/api/v1', routeMessages);
app.use('/api/v1', routeUsers);
app.use(errorHandler);

const connection_url = 'mongodb://localhost:27017/whatsapp'

app.get("/", (req,res) => res.status(200).send("hello world"));

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
