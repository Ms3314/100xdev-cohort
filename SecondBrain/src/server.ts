import express from "express";
import User from "./models/userSchema"
import Content from "./models/contentSchema";
import bcrypt from 'bcryptjs';
import mongoose, { Types } from "mongoose";
import jwt from "jsonwebtoken"
import { Autheticated } from "./middlewares/auth";
import cookieParser from 'cookie-parser';
import { Tags } from "./models/tagsSchema";
import crypto , {createHash} from "crypto"
import { Link } from "./models/linkSchema";

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
    // if(!passwordRegex.test(password))
    //     {
    //         return res.status(Statuscode.Errorininputs).json("Think of a better password , this one is too ease")        
    //     }
    
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



app.post('/api/v1/login' , async (req , res) => {
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
                    res.cookie(token.toString() , "sami");
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


// this route will add u the content 
app.post('/api/v1/content' , Autheticated , async (req , res) => {
    let { type , link , title , tags  } = req.body
    let tagarr:mongoose.Types.ObjectId[] = []
    let user:any = req.user ;
    let i = 0 ;
    tags.map(async (tag:String)=>{
        let tagObtained = await Tags.findOne({title : tag})
        if(tagObtained) {
            // console.log(tagObtained)
            tagarr.push(tagObtained._id)
            //console.log("Tag previously existed now added into the db")
        }else {
            const Tagss = new Tags({
                title : tag
            })
            const Tagsfinal = await  Tags.create(Tagss)
            // console.log(Tagsfinal , "this ones do not exist we are meking them ")
            tagarr.push(Tagsfinal._id)
            // console.log("Tag didnt exist now has been created")
        }
    })
    // bhai yaha problem ye hai ki tags bhi aak tarah ka refrence hai ak nai tags ka schema banake usko link karna hai toh isliye tabtak ke liye isko rook dena hai 
    const declareduser:Usercred | null =await User.findOne({username : user.username});
    console.log(declareduser , "found the user")
    // console.log(user , "in the real root")
    const Contentdata = new Content({
        link ,
        title ,
        type ,
        tags : tagarr,
        //here is the only problem this thing accepts objectId as its input
        userId : declareduser._id
    })
    const savedContent = await Content.create(Contentdata)
    res.status(200).json(savedContent)
})


//enabling of an sharable link , only the authenticated perosn can enable this thing 
app.post("/api/v1/brain/share" ,Autheticated ,async  (req , res)=>{
    let {share} =  req.body ;
    if (share === true) {
        // we get the username of the user now 
        let user:any = req.user ;
        console.log(user , "user mil gaya"); 
        let Userfound = await User.findOne({username : user.username})
        if(Userfound)  {       
            let LinkExists = await Link.findOne({userId : Userfound._id})
            if (LinkExists) {
                res.status(200).json({
                    "msg" : "Link already exists",
                    "link" : `localhost:3000/api/v1/brain/${LinkExists.hash}`
                })
            } else {
                const hash = createHash('sha256').update(user.username).digest('base64')
                const newLink = new Link({
                    hash , 
                    userId : Userfound._id
                })
                await Link.create(newLink);
                res.status(200).json({
                    "link" : `localhost:3000/api/v1/brain/${hash}`
                })
            }
        }
        
    }   

})

// the types of a Content type that is suppposed to be spit out
type Contentype = {
        "id" : Types.ObjectId,
        "type" : String ,
        "link" : String ,
        "title" : String ,
        "tags"  : [],
}

// this is like the sharable link for the second brain of a particular user
app.get("/api/v1/brain/:link" , async (req , res) => {
    const linkhere = req.params.link ;
    let linkExists =  await Link.findOne({hash : linkhere})
    // initializing the content we are gonna add int eh fina content 
    let contentarr:Contentype[] = []
    // console.log(linkhere)
    // console.log(linkExists , "the link exists in the DB ")
    if (linkExists) {
        let Userfound:any = await User.findById(linkExists.userId)
        if(Userfound) {
            // finding all the content of a specific user 
            let Contentfound = await Content.find({userId: Userfound._id}).populate({path : "tags" , select : ["title"]})
            Contentfound.map((item , index)=>{
                let tagsarr:[] = [];
                // console.log(item.tags)
                item.tags.map((x)=>tagsarr.push(x.title));
                // [] here we are cooking the contents array by looping each of the content 
                let contents:any = {
                    "id" : index + 1 ,
                    "type" : item.type,
                    "link" : item.link,
                    "title" : item.title,
                    "tags" : tagsarr,
                }
                contentarr.push(contents)
                // then we pushing each of the content here cuz we using content of one user only
            })
            // this our final object which we send to the client 
            let Contentfinal = {
                "username" : Userfound.username,
                "contents" : contentarr
            }
            res.status(200).json(Contentfinal)
        }
        else {
            res.status(444).json({"err" : "1 Some link problem "})
        }
    }
    else {
        res.status(444).json({"err" : "2 Some link problem "})
    }
})

app.get("/donothing" , Autheticated , (req, res)=>{
    console.log("yess ")
})

app.listen(PORT , () =>{
    console.log(`Server is running on PORT ${PORT}`)
} )