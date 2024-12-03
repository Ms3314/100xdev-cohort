import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : String ,
    email : String ,
    Password : {
        type : String ,
        required : true 
    }
})

const User = mongoose.model('User', userSchema);

export default User