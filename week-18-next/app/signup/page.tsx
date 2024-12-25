"use client"
import axios from 'axios'
import React, { useState } from 'react'

function Signup() {
const [username , setUsername] = useState("")
const [password , setPassword] = useState("")
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='border p-2 flex gap-4'>
        <input  type="text" onChange={(e)=>{
            setUsername(e.target.value)
        }   
        } placeholder='username' />
        <input type="password" onChange={(e)=>{
            setPassword(e.target.value)
        }
        }    placeholder='password' />
        <button onClick={()=>{
            axios.post("https://localhost:3000/api/v1/signup",{
                username ,
                password 
            })
        }}>Signup</button>
      </div>
    </div>
  )
}

export default Signup