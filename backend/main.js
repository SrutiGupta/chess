const express =require('express');
const socket=require('socket.io');
const http=require('http');
const path = require("path");
const {Chess} =require ('chess.js');


//for socket
const app =express()
const server=http.createServer(app)
const io=socket(server)
//by chess mdn
const chess=new Chess()

let players={}
let currentPlayer="W";

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>
{
   res.render('index',{title:"Chess Game"})
})

io.on("connection",function(uniquesocket){
    console.log("connected")

    uniquesocket.on("hie",function(){
        io.emit("hie papri")
    })
})

server.listen(8000,function(){
    console.log("listening at 8000" )
})
