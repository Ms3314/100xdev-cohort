import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port : 8000});


// event handler 
wss.on('connection' , function (socket){
    console.log("User connected");
    socket.on("message" , (e)=>{
        // console.log(e.toString());
        // socket.send(e.toString())
        if(e.toString() === 'Ping')
            {
                socket.send("Pongg!")
            }
    })
})