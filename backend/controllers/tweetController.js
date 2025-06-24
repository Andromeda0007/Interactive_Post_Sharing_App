import { Tweet } from "../models/tweetSchema.js";
import { User } from "../models/userSchema.js";

export const createTweet = async (req, res)=>{
    try{
        const{description, loggedInUserId} = req.body;

        console.log("asfsdfadsfjlsdfnasdnfansdf", loggedInUserId);

        if(!description || !loggedInUserId)
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
                userId: loggedInUserId,
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

export const deleteTweet = async (req, res)=>{
    try{
        const {id} = req.params;
        console.log(id);
        await Tweet.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Tweet deleted successfully",
            success: true,
        })
    }
    catch(error){
        console.log(error);
    }
};

export const likeOrDislike = async (req, res)=>{
    try{
        const loggedInUserId = req.body.userId;
        const tweetId = req.params.id; 
        console.log("tweetId", tweetId);

        const tweet = await Tweet.findById(tweetId);
        if(tweet.like.includes(loggedInUserId))
        {
            //dislike

            await Tweet.findByIdAndUpdate(tweetId, { $pull: { like: loggedInUserId } });

            
            return res.status(200).json({
                message: "User disliked your tweet",
            })
        }
        else
        {
            //like
            await Tweet.findByIdAndUpdate(tweetId, {$push:{like:loggedInUserId}});

            return res.status(200).json({
                message: "User liked your tweet",
            })
        }

    }
    catch(error){
        console.log(error)
    }
};

export const getAllMyTweets = async (req, res) => {
  try {
    const id = req.params.id; // Logged-in user ID

    // Verify that user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Fetch ONLY the tweets created by the logged-in user
    const tweets = await Tweet.find({ userId: id })
      .sort({ createdAt: -1 })
      .populate("userId", "name username"); // ⬅️ Populate user info if needed

    return res.status(200).json({ tweets });
  } catch (error) {
    console.error("Error fetching user's tweets:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



export const getFollowingTweets = async (req, res) => {
  try {
    const id = req.params.id;

    // Get the logged-in user
    const loggedInUser = await User.findById(id);

    if (!loggedInUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if following list is empty
    if (!loggedInUser.following || loggedInUser.following.length === 0) {
      return res.status(200).json({ tweets: [] });
    }

    // Fetch tweets from users that the logged-in user is following
    const followingTweets = await Tweet.find({
      userId: { $in: loggedInUser.following },
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      tweets: followingTweets,
    });

  } catch (error) {
    console.error("Error in getFollowingTweets:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
