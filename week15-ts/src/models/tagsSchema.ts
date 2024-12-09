import mongoose, { mongo } from "mongoose";

const tagsSchema = new mongoose.Schema({
    title : {
        type : String ,
        unique : true,
    }
})

export  const Tags = mongoose.model("Tags" , tagsSchema);