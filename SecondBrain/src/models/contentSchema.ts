import mongoose, { Types } from "mongoose";
enum doctyp  {
    "document",
    "tweet",
    "youtube",
    "link"
}

const contentSchema = new mongoose.Schema({
    link : {
        type : String ,
        require : true,
    },
    type : {
        type : String,
        enum : doctyp ,
        require : true
    },
    title : {
        type : String ,
        require : true ,
    },
    tags : [{
        type : Types.ObjectId ,
        ref : 'Tags', 
    }],
    userId : {
        type : Types.ObjectId,
        ref : 'User',
        required : true,
    }
})

const Content = mongoose.model('Content' , contentSchema)

export default Content