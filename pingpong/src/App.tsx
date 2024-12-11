import { useEffect, useRef, useState } from 'react';
import './App.css'

function App() {
  const [socket , setSocket]= useState();
  const inputRef = useRef();

  function handleMessage () {
    if (!socket) {
      return
    }
    const messsage = inputRef.current.value
    //@ts-expect-error idk why is this doing this
    socket.send(messsage);
  }

  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8000");
    setSocket(ws)
    ws.onmessage = (ev) =>{
        alert(ev.data)
    }
  },[])

  return (
    <>
      <div>
        Hi there 
      </div>
      <input ref={inputRef} type='text' id='ping' placeholder='your messsage here ..'  ></input>
      <button onClick={handleMessage} >Send</button>
    </>
  )
}

export default App
