"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
let socketobjreturnee = {};
wss.on("connection", (socket) => {
    wss.on('error', console.error);
    socket.send("Socket connected");
    socket.on("message", (message) => {
        // when i get a message this is happening 
        // the data is in this format like payload wageira type 
        //{
        //  type : "send"
        //  payload : {
        //    message : "",
        //    room : "" ,
        //    name : "",  
        //  }
        // converting the string format data into a readable format !!!!
        // console.log(JSON.parse(message.toString()))
        const mesg = JSON.parse(message.toString());
        console.log(mesg);
        socket.send(`${mesg.payload.name} has entered in room ${mesg.payload.room}`);
        // so basically when u enter first time in most cases u cant enter with the same socket connection again but just for the sake of it 
        if (mesg.type === "enter") {
            let condition = false;
            allSockets.forEach((x) => {
                if (x.socket === socket) {
                    if (x.room === mesg.payload.room) {
                        condition = true;
                    }
                }
            });
            if (!condition) {
                // just in case the socket already have been added 
                let socketobj = {
                    socket: socket,
                    room: mesg.payload.room,
                    name: mesg.payload.name
                };
                allSockets.push(socketobj);
            }
        }
        if (mesg.type === "send") {
            let condition = false;
            allSockets.forEach((x) => {
                if (x.room === mesg.payload.room) {
                    condition = true;
                }
            });
            // just some checks so that someone cant sent messages if no one else is there in that room 
            if (condition) {
                socketobjreturnee = {
                    name: mesg.payload.name,
                    room: mesg.payload.room,
                    message: mesg.payload.message,
                };
            }
            else {
                socket.send("Error");
            }
            console.log("Message recieved " + message.toString());
            allSockets.forEach((sock) => {
                console.log(sock.socket, "socket I am searching");
                console.log(socket, "I have this one");
                if (sock.socket === socket) {
                    // Confirmation to the sender
                    sock.socket.send("Socket matched you have messaged");
                }
                else if (sock.room === mesg.payload.room) {
                    // Broadcast to others in the same room
                    console.log("this is what I will be giving to others", JSON.stringify(socketobjreturnee));
                    sock.socket.send(JSON.stringify(socketobjreturnee));
                }
            });
        }
    });
});
