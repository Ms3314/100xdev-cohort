import { useEffect, useRef, useState } from 'react';
import './App.css'

const message = [
  {
    self : false ,
    message : 'Welcome to the pingpong chat room',
    user : "Ping pong community"
  },
  

]



function App() {
  const [ ars , setars ] = useState(message);
  const [socket , setSocket]= useState();
  const inputRef = useRef();
  const [userid , setuserid] = useState(null)
  
  function handleMessage () {
    if (!socket) {
      return
    }
    const messsage1 = inputRef.current.value
    //@ts-expect-error idk why is this doing this
    console.log(messsage1 , "this is the message we got")
    const selfmessage = {
      self : true ,
      message : messsage1 ,
      user : userid
    }
    socket.send(JSON.stringify(selfmessage));
    message.push(selfmessage)
    console.log("this is what I am sending " , messsage1);
    inputRef.current.value = ""
    // console.log(ars)
  }

  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8000");
    setuserid(Math.random()*10000)
    setSocket(ws)
    ws.onmessage = (ev) =>{
      // alert("aja bhai");
        // console.log((JSON.parse(ev.data)) , "coming from ws")
        // console.log(ev.data , "is this is a json string ?? ")
        const parsed = JSON.parse(ev.data)
        const messobj = {
          self : false,
          message : ev.data , 
          user : "others" 
        }
        // setars((pre) => [...pre , messobj])
        if (messobj.self === false)  {
           setars((pre) => [...pre , parsed])
           console.log(ars)
        }
      }
  },[])

  return (
    <>
      <div>
        Hi there 
      </div>
      <div className='mb-10 p-10 flex flex-col gap-10 w-96 bg-gray-500'>
          {
            ars.map((x , index)=>{
              return (
                <div key={index} className= {`rounded-xl p-5 w-[200px] flex flex-col  ${x.user === userid ? " bg-green-900  " : "bg-blue-900 ml-32 " } align-middle0`} >
                    <p className='text-[10px] mr-10 mb-5'>{x.user}</p>
                    <p className='self-start text-[15px]'>{x.message}</p>
                </div>
              )
            })
          }
      </div>
      <div>
      <input ref={inputRef} type='text' id='ping' placeholder='your messsage here ..' className='p-3 mr-10 rounded-lg' ></input>
      <button onClick={handleMessage} >Send</button>
      </div>
    </>
  )
}

export default App
