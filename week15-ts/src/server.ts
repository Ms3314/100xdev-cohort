import express from "express";
import User from "./models/userSchema"
import bcrypt from 'bcryptjs';
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

mongoose.connect("mongodb://localhost:27017/SecondBrain")

const app = express()
const PORT:number = 3000


enum Statuscode {
    Signedup  =  200 ,
    Errorininputs =  411 ,
    Useralready = 403 ,
    Servererror = 500 ,
}
app.use(express.json());



app.get("/" , (req , res) =>{
    res.status(200).json({message : "Hello world"})
})

let usernameRegex = /^[a-zA-Z]{3,10}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(.{8,})$/;

type Usercred = {
    username : string ,
    email?: string,
    Password : string
}

app.post('/api/v1/signup' , (req , res)=> {
    let {username , password} = req.body
    const pass = "B4c0/\/"
    if(!usernameRegex.test(username))
        {
            return res.status(Statuscode.Errorininputs).json("username should be 3-10 letters")
        }
    if(!passwordRegex.test(password))
        {
            return res.status(Statuscode.Errorininputs).json("Think of a better password , this one is too ease")        
        }
    
    var bcrypt = require('bcryptjs');
    bcrypt.genSalt(10 , function(err:any, salt:any) {
        bcrypt.hash(pass, salt, async function(err:any, hash:string) {
            // Store hash in your password DB.
            let foundemail:Usercred = User.findOne({
                username 
            })
            if(foundemail){
                return res.status(Statuscode.Useralready).json("User already exists")
            }
            const data = new User({
                username ,
                Password : hash,
            })
            const saved = await User.create(data)
            var token = jwt.sign({ username: username }, 'shhhhh');
            return res.status(Statuscode.Signedup).json(token)
        });
    });

    
    
    
})
app.post('/api/v1/login' ,(req , res)=>{
    let {username , password} = req.body;
    let foundemail:Usercred = User.findOne({
        username 
    })
    if(foundemail)
        {
            bcrypt.compare("B4c0/\/", foundemail.Password, function(err, resp) {
                if (resp == password){
                    var token = jwt.sign({ username: username }, 'shhhhh');
                    return res.status(Statuscode.Signedup).json(token)
                }
                else {
                    return res.status(Statuscode.Errorininputs).json(token)
                }
            });
        }
    else {
        return res.status(Statuscode.Errorininputs).json("invalid credetials")
    }

})

app.post("/donothing" , (req, res)=>{
    console.log("yess ")
})

app.listen(PORT , () =>{
    console.log(`Server is running on PORT ${PORT}`)
} )