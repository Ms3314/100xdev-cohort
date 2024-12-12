import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port : 8000});
let socketarray = []
let userCount = 0;
// event handler 
wss.on('connection' , function (socket){
    userCount++
    socketarray.push(socket)
    console.log("User connected" + userCount);
    socket.on("message" , (e)=>{
        console.log(e.toString() , "kuch aya kya");
        // socket.send(e.toString())
        socketarray.map(socket1 => {
            socket1.send(e.toString())
        })
    })
})