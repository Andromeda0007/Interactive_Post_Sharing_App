import mongoose, { mongo } from "mongoose";

const tweetSchema = new mongoose.Schema({
    description:{
        type: String,
        required: true,
    },
    like:{
        type: Array,
        default:[],
    },
    reshare:{
        type: Array,
        default:[],
    },
    comment:{
        type: Array,
        default:[],
    },
    bookmark:{
        type: Array,
        default: []
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true});

export const Tweet = mongoose.model("Tweet", tweetSchema);