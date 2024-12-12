import { WebSocketServer , WebSocket} from "ws";

const wss = new WebSocketServer({port : 8080});


type websocket = {
    socket  : WebSocket ;
    room : String 
}
let allSockets:websocket[] = [];

wss.on("connection" , (socket) => {
    
    // console.log("User connected #" + userCount)
    socket.on("message" , (message) => {
        // when i get a message this is happening 
        // the data is in this format like payload wageira type 
        //{
        //  type : "send"
        //  payload : {
        //    message : "",
        //    room : "" ,
        //    name : "",  
        //  }
        const mesg = JSON.parse(message.toString())
        if (mesg.type === "send") {
         
            const socketobj = {
                socket : socket ,
                room : mesg.payload.room,
                name : mesg.payload.name
            }
            allSockets.push(socketobj)
            console.log("Message recieved " + message.toString())
            allSockets.map((sock) =>{
                if(sock.room === mesg.payload.room) {
                    console.log( "this is what i will be giving to others" , JSON.stringify(socketobj));
                    //@ts-ignore
                    sock.send(JSON.stringify(socketobj));
                }
            })  
    }
    })
})



