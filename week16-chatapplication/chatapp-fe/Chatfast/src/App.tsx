import './index.css'
import './App.css'
import { useEffect, useRef, useState } from 'react';


function App() {
  const [info , setinfo ] = useState({
    name : "" ,
    room : "" ,
    existroom : true ,
  })
  console.log(info)

  if(info.name == "") {
    return (
      <div className='flex flex-row gap-[400px] '>
      <h1 className='text-[60px] text-black '>CHAT FAST <br></br> <span className='text-sm'>chat with your friends and family for free with just a code </span></h1>
      <Nameroom setinfo={setinfo} />
      </div>
    )
  } else {
    return (
      <>
      <h1 className='text-black '>CHAT FAST</h1>
      <Chatroom info={info} />
      </>
    )
  }
}

// here is where I ask the thing about his information !!
function Nameroom({setinfo}) {
  const nameref = useRef<HTMLInputElement | null>(null)
  const roomref = useRef<HTMLInputElement | null>(null)
  const buttonref = useRef<HTMLInputElement | null> (null) 
  const descref = useRef<HTMLInputElement | null> (null) 

  function handleSubmit(e:unknown) {
      e.preventDefault(); // Prevent default form submission behavior
      // checking if we have any khali 
      if(nameref.current?.value === '' || roomref.current?.value === '' )
        {
          return alert('please input the name and your room')
        }
      
      console.log(nameref.current?.value , "this is the vaue")
      // settin the state if the values are given 
      setinfo({
        name : nameref.current?.value ,
        room : roomref.current?.value ,
        existroom : true
      })
      // console.log( 'd' , typeof(e.target.name.value))
      console.log("You have entered into the chat !!")
    
  }

  function handlemake(e) {
    const newroom = `${Math.floor(Math.random()*100 + Date.now())}`
    if (roomref.current) {
      roomref.current.value = newroom;
    }
    if(buttonref.current) {
      buttonref.current.innerText = "Create Room"
    }
    if(descref.current) {
      descref.current.innerText = "Join inn to create your new room"
      descref.current.disabled = true
    }
  }
 
  return (
    <div className='p-5 rounded-xl w-[350px] flex flex-col bg-gray-600 ' >
        <form onSubmit={handleSubmit} className='text-white  flex flex-col gap-4'>
          <div className='flex  flex-row gap-3 '>
            <p>
              Name :
            </p>
            <input id='name'  ref={nameref} type="text" name="name"   className='rounded-sm border-2 ' />
          </div>
          <div className='flex flex-row gap-3'>
            <p>
              Room : 
            </p>
            <input  ref={roomref} id='room' type="text" name="room"   className='rounded-sm border-2 '  />
          </div>
          <button ref={buttonref} className='ml-20 text-sm w-32  p-2 bg-white text-black rounded-xl'>Join Room</button>
        </form>
        <button ref={descref} onClick={handlemake} className='text-white mt-3 ' id='chat' >Dont have a room , make one  ??</button>
    </div>
  )
}

// this is the chat room 
function Chatroom({info}) {
  // let messagestore: { message: any; name: any; me: boolean; }[] = []
  const [messagestore , setmessagestore] = useState([])
  const [socket , setsocket] = useState<WebSocket>(null)
  let msgref = useRef(null)
  useEffect(()=>{
    const newsocket = new WebSocket("ws://localhost:8080")
    setsocket(newsocket)
    // when the web socket will be open the below thing will work 
    newsocket.onopen = () => {
      console.log("Connection established");
      const message = {
        type : "enter" ,
        payload : {
          room : info.room,
          name : info.name ,
        }
      }
      newsocket.send(JSON.stringify(message))
    }
    // when I get some output from the user
    newsocket.onmessage= (msg) => {
      console.log( msg.data , "A message is recieved");
      console.log( msg.data , "/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////");
      let data = JSON.parse(msg.data)
      if(data) {
      const messsg = {
        message : data.message ,
        name : data.name,
        me : false 
      }
        setmessagestore((prev)=> [...prev , messsg])
      
    }
    }
    console.log(messagestore)
  },[])

  function handleSend () {
    const messagetosend = msgref.current?.value ;
    console.log(messagetosend , "this is the message " ) 
    const message = {
      type : "send" ,
      payload : {
        message : messagetosend,
        room : info.room,
        name : info.name 
      }
    }

    //pushing this to the message object 
    const messsg = {
      "message" : messagetosend ,
      "name" : info.name,
      "me" : true 
    }
    setmessagestore((mes) => [...mes , messsg])
    console.log( "wha do u gaaaadgkfsdgfdhkfdhkfsdhgfsdkfjk" ,  messagestore)
    socket.send(JSON.stringify(message))
  }  

  return (
    <div className='text-white'>
    <p className=' bg-blue-400 rounded-md p-3 text-black font-mono'>WELCOME TO FAST CHAT ROOM #{info.room}  !!</p>
    <div className='flex flex-col justify-end border-2 w-[500px] m-10 rounded-lg'>

        {
          messagestore.map((x , index)=>{
            if(x.message !== undefined){
            return (
              <MessageCompnonet key={index} data={x}  />
            )
          }
          })
        }
      <div className=' border-2 p-5 p '>
        <input type="text" ref={msgref} placeholder='Message..' className='p-2 border-2  w-80%'/>
        <button onClick={handleSend} className='ml-2 '>Send</button>
      </div>
    </div>
    </div>
  )
}

// this is the induvidual message component
function MessageCompnonet({data}) {
  console.log("sddddddddsdsds")
  console.log(data , "data in the messagecompoenent")
  // console.log(data , "data in the messagecompoenent")
  return(
    <div className={`w-[200px] border-2 p-5 m-5 text-left rounded-lg shadow-md ${data.me === false ? ' ml-[280px] ' : "" } `}>
      <p className="text-sm font-semibold text-gray-200">{data.name}</p>
      <h3 className="text-sm text-gray-300 mt-2">
        {data.message}
      </h3>
    </div>

  )
}
export default App
