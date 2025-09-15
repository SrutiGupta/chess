const express =require('express');
const socket=require('socket.io');
const http=require('http');
const {Chess} =require ('chess.js');


//for socket
const app =express()
const server=http.createServer(app)
const io=socket(server)

const chess=new Chess()

let players={}
let currentPlayer="W";

app.set("view engine", "ejs");//similar to html 
app.use(express.static(path.join(__dirname,"public")))

