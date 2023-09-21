// importing
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Messages from "./dbMessages.js";
import Pusher from "pusher";

// app config
const App = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1663243",
    key: "0c0eab94e1f40548031c",
    secret: "910d732541d8f6dc52e3",
    cluster: "ap2",
    useTLS: true
  });

// middleware
App.use(express.json());
App.use(cors());

// App.use((req, res, next)=>{
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     next();
// })

// database config
const connection_url = "mongodb+srv://rockknight54321:Rock54321@cluster0.cd0vhtg.mongodb.net/whatsapp";
mongoose.connect(connection_url, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', ()=>{
    console.log("db connected");
    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change)=>{
        console.log(change);

        if(change.operationType == "insert"){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timeStamp: messageDetails.timeStamp,
                received: messageDetails.received
            });
        }else{
            console.log("error in pusher");
        }
    }); 
});

// ??


// api route
App.get("/", (req, res)=>{
    res.status(200).send("hello world!!");
});

App.post("/message/new", (req, res)=>{
    const dbMessage = req.body;
    Messages.create(dbMessage).then((err, data)=>{
        if(err){
            res.status(200).send(err);
        }
        else{
            res.status(201).send(data);
        }
    }); 
});

App.get("/message/sync", (req, res)=>{
    Messages.find().then((err, data)=>{
        if(err){
            res.status(200).send(err);
        }
        else{
            res.status(200).send(data);
        }
    }); 
});

// listener
App.listen(port, ()=>console.log(`listing on ${port}`));