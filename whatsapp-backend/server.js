const express = require ('Express');
const mongoose = require ('mongoose');
const { default: dbMessages } = require('./dbMessages');
const Messages = require("./dbMessages")
const app = express()
const port = process.env.PORT || 9000
const connection_url = 'mongodb+srv://VarunChauhan:hd6RyeGOOzdVdbv0@cluster0.imbhc.mongodb.net/wsappdb?retryWrites=true&w=majority'
var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '1090710',
  key: 'fadfaf4e9bedb9507ab8',
  secret: '8c0ad60bc17f51ef1147',
  cluster: 'us2',
  encrypted: true
});


//DB Config
mongoose.connect(connection_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})


const db = mongoose.connection

db.once('open',()=>{
    console.log("DB Connected");
    
    const msgcollection = db.collection("messagecontents");
    const changestream = msgcollection.watch();

    changestream.on('change',(change)=>{
        console.log(change)

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',
            {
                name:messageDetails.user,
                message:messageDetails.message
            }
            );
        }else{
            console.log('Error triggering Pusher');
        }
    })
});

//Middleware
app.use(express.json())

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    next();
})
//Api Routes

app.get('/',(req,res)=> res.status(200).send('hello world'));

app.post('/messages/new',(req,res)=>{
    const dbmessage = req.body;

    Messages.create(dbmessage,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data)
        }
    });
});

app.get('/messages/async',(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
});

//Listen
app.listen(port,()=>console.log(`Listening on localhost ${port}`))



//hd6RyeGOOzdVdbv0