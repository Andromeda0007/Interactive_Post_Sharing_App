import { Tweet } from "../models/tweetSchema.js";

export const createTweet = async (req, res)=>{
    try{
        const{description, UserId} = req.body;

        if(!description || !UserId)
        {
            return res.status(401).json({
                message:"All Fields are required",
                success: false,
            });
        }
        else
        {
            await Tweet.create({
                description: description,
                userId: UserId,
            });

            return res.status(200).json({
                message: "Tweet created successfully",
                success: true,
            })
        }
    }
    catch(error){
        console.log(error);
    }
}