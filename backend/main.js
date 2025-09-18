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
let currentPlayer="w";

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>
{
   res.render('index',{title:"Chess Game"})
})

io.on("connection",function(uniquesocket){
    console.log("connected")

    //uniquesocket.on("hie",function(){
      //  io.emit("hie papri")
    if(!players.white)
    {
        players.white=uniquesocket.id;
        uniquesocket.emit("playerRole", "w");
    }
    else 
        if(!players.black)
        {
            players.black=uniquesocket.id;
            uniquesocket.emit("playerRole", "b");
        }
        else{
            uniquesocket.emit( "spectatorRole");
        }
})

uniquesocket.on("disconnect",()=>{
    if(uniquesocket.id===players.white)
    {
        delete players.white;
    }
    else if(uniquesocket.id===players.black)
    {
       delete players.black;
    }
})






server.listen(8000,function(){
    console.log("listening at 8000" )
})
