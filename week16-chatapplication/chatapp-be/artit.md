{
        type : "send"
        payload : {
            message : "",
            room : "" ,
            name : "",  
        }
}

this will be the one i will send when i want to make a connection like making a room or something 

{
        type : "enter"
        payload : {
            room : "" ,
            name : "",  
        }
}

this will store an object in the form of an array 
this will be for like finding the sockets and also storing the messages for that particular room 
[
    {
        socket : socket 
        name : name 
        room : room
        messgages : ["sddd" , "ddddf" , "ddfdff"]  .. these will be all the messages over here || abhi ke liye lets just ignore this  
    }
    .
    .
    .
    .
    .
]

////////////////////////////////////////////////////

for recienving a message the object will be like this 

{
    type : "recieve"
    payload : {
        name : name ,
        message : message ,
    }
}

