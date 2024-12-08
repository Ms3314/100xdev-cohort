import express from "express";
import User from "./models/userSchema"
import Content from "./models/contentSchema";
import bcrypt from 'bcryptjs';
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { Autheticated } from "./middlewares/auth";
import cookieParser from 'cookie-parser';


mongoose.connect("mongodb://localhost:27017/SecondBrain")

const app = express()
const PORT:number = 3000

enum Statuscode {
    Signedup  =  200 ,
    Errorininputs =  411 ,
    Useralready = 403 ,
    Servererror = 500 ,
    credentialsInvalid = 444,
}
app.use(express.json());
app.use(cookieParser())

app.get("/" , (req , res) =>{
    res.status(200).json({message : "Hello world"})
})

let usernameRegex = /^[a-zA-Z]{3,10}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(.{8,})$/;

type Usercred = {
    _id : any;
    username : string ,
    Password : string,
    __v:number
}

app.post('/api/v1/signup' ,async (req , res)=> {
    let {username , password} = req.body
    console.log(req.body.username)
    if(!passwordRegex.test(password))
        {
            return res.status(Statuscode.Errorininputs).json("Think of a better password , this one is too ease")        
        }
    
    bcrypt.genSalt(10 ,async  function(err:any, salt:any) {
        bcrypt.hash(password, salt, async function(err:any, hash:string) {
            // Store hash in your password DB.
            console.log(hash , "hash kya mila")
            let foundemail:Usercred =await User.findOne({
                username 
            })
            console.log(foundemail , "ye found email ka type kya hai")
            if(foundemail){
                return res.status(Statuscode.Useralready).json("User already exists")
            }
            const data = new User({
                username ,
                Password : hash,
            })
            const saved = await User.create(data)
            var token = jwt.sign({ username: username }, 'shhhhh');
            res.cookie(token.toString() , "sami");
            return res.status(Statuscode.Signedup).json(token)
        });
    });

    
})



app.post('/api/v1/login' ,async (req , res) => {
    let {username , password} = req.body;
    let foundemail:any = await User.findOne({
        username : username
    })
    console.log(foundemail.Password , "this is the ID ")
    if(foundemail)
        {
            bcrypt.compare(password, foundemail.Password, function(err, resp) {
                console.log(resp)
                if (resp === true){
                    var token = jwt.sign({ username: username }, 'shhhhh');
                    return res.status(Statuscode.Signedup).json(token)
                }
                else {
                    return res.status(Statuscode.Errorininputs).json({
                        "msg" : "invalid credentials"
                    })
                }
            });
        }
    else {
        return res.status(Statuscode.Errorininputs).json("account does not exist make a new account ")
    }

})

app.post('/api/v1/content' , Autheticated ,  (req , res) => {
    let { type , link , title , tags  } = req.body
    let user = req.user ;
    console.log(user , "in the real root")
})


app.get("/donothing" , Autheticated , (req, res)=>{
    console.log("yess ")
})

app.listen(PORT , () =>{
    console.log(`Server is running on PORT ${PORT}`)
} )