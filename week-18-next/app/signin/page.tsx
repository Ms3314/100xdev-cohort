"use client"
import axios from 'axios'
import React, { useState } from 'react'

function Signin() {
const [username , setUsername] = useState("")
const [password , setPassword] = useState("")
  return (
    <div className='text-black w-screen h-screen flex justify-center items-center'>
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
            axios.post("http://localhost:3000/api/v1/signin",{
                username ,
                password 
            }).then((x)=>{
                console.log(x.data)
                localStorage.setItem("token",x.data.token)
            }).catch((err)=>{
                console.log(err)
            })
        }}>SinIn</button>
      </div>
    </div>
  )
}

export default Signin
