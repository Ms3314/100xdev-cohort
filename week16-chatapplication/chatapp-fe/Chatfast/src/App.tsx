import './index.css'
import './App.css'
import { useRef, useState } from 'react';


function App() {
  const [info , setinfo ] = useState({
    name : "" ,
    room : "" ,
    existroom : true ,
  })
  console.log(info)

  if(info.name == "") {
    return (
      <Nameroom setinfo={setinfo} />
    )
  } else {
    return (
      <Chatroom />
    )
  }
}

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
    <>
        <form onSubmit={handleSubmit} className='text-white flex flex-col gap-4'>
          <div className='flex flex-row gap-3'>
            <p>
              Name :
            </p>
            <input id='name'  ref={nameref} type="text" name="name"   className='border-2 ' />
          </div>
          <div className='flex flex-row gap-3'>
            <p>
              Room : 
            </p>
            <input  ref={roomref} id='room' type="text" name="room"   className='border-2 '  />
          </div>
          <button ref={buttonref} className='text-sm  ml-20 p-2 bg-white text-black rounded-xl'>Join Room</button>
        </form>
        <button ref={descref} onClick={handlemake} className='text-white' id='chat' >Dont have a room , make one  ??</button>
    </>
  )
}

function Chatroom() {
  return (
    <p className='text-white'>HELLOOOO PEOPLEE !!</p>
  )
}

export default App
