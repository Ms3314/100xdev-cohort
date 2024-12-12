import { WebSocketServer , WebSocket} from "ws";

const wss = new WebSocketServer({port : 8080});

let userCount = 0;
let allSockets:WebSocket[] = [];

wss.on("connection" , (socket) => {
    allSockets.push(socket)
    userCount++ ;
    console.log("User connected #" + userCount)
    socket.on("message" , (message) => {
        console.log("Message recieved " + message.toString())
        allSockets.map((sock) =>{
            sock.send(message.toString() + "send from the server")
        })  
    })
})



