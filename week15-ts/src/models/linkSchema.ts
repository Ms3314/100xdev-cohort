import mongoose, { Types } from "mongoose";

const linkSchema = new mongoose.Schema({
    hash : {
        type : String ,
        require : true ,
    },
    userId : {
        type : Types.ObjectId,
        require : true ,
        ref : 'User'
    }
})

export const Link = mongoose.model("Link" , linkSchema)