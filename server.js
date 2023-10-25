//  importig
import express from "express";
import mongoose from "mongoose";

//  app config
const app = express();
const port = process.env.PORT || 9000

//  middleware

//  DB config
const connection_url = 'mongodb://root:example@127.0.0.1:27017/'


mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//  ?????

//  api routes
app.get("/",(req,res) => res.status(200).send("hello world"));

//  listen
app.listen(port,()=>console.log(`Listening on localhost:${port}`));