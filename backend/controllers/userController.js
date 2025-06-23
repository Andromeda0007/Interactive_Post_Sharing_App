import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

export const Register = async (req, res)=>{
    try{
        const {name, username, email, password} = req.body;
        if(!name || !username || !email || !password)
        {
            return res.status(401).json({
                message: "All fields are required",
                success: false,
            });
        }

        const user = await User.findOne({email});
        if(user)
        {
            return res.status(401).json({  
                message: "User alredy exist",
                success: false
            })
        }
        else
        {
            const hashedPassword = await bcryptjs.hash(password, 16);

            await User.create({
                name: name,
                username: username,
                email: email, 
                password: hashedPassword, // ise pehle encrypt karenge 
            })
            return res.status(201).json({
                message: "Account created Successfully",
                success: true,
            })
        }
    }
    catch(error)
    {
        console.log(error);
    }
};

export const Login = async (req, res)=>{
    try{
        const {username, password} = req.body;

        if(!username || !password)
        {
            return res.status(401).json({
                message: "All fields are required!!",
                success: false,
            })
        }
        else
        {
            const user = await User.findOne({username});

            if(user)
            {   
                const match = await bcryptjs.compare(password, user.password);

                if(!match)
                {
                    return res.status(401).json({
                        message: "Incorrect password or email",
                        success: false
                    })
                }
                else
                {   
                    const token = await jwt.sign({id:user._id}, process.env.TOKEN_SECRET, {expiresIn: "1d"});

                    return res.status(201).cookie("token", token, {expiresIn: "1d", httpOnly:true}).json({
                        message: `Welcome back ${user.username}`,
                        success: true,
                    })
                }
            }
            else
            {
                return res.status(401).json({
                    message: "Incorrect Password or email",
                    success: false,
                })
            }
        }
    }
    catch(error){
        console.log(error);
    }
};


export const Logout = (req, res)=>{
    return res.cookie("token", "", {expiresIn: new Date(Date.now())}).json({
        message: "User loggedOut Successfully",
        success: true,
    });
};


export const Bookmark = async (req, res) => {
  try {
    const loggedInUserId = req.user; // ✅ secure: set by auth middleware
    const tweetId = req.params.id;

    console.log("tweetId to push:", tweetId);
    console.log("Updating user:", loggedInUserId);


    const user = await User.findById(loggedInUserId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const alreadyBookmarked = user.bookmark.includes(tweetId);

    if (alreadyBookmarked) {
      // Remove tweet from bookmarks
      await User.findByIdAndUpdate(loggedInUserId, {
        $pull: { bookmark: tweetId },
      });

      return res.status(200).json({
        success: true,
        message: "Removed from bookmarks.",
      });
    } else {
      // Add tweet to bookmarks
      await User.findByIdAndUpdate(loggedInUserId, {
        $push: { bookmark: tweetId },
      });

      return res.status(200).json({
        success: true,
        message: "Added to bookmarks.",
      });
    }
  } catch (error) {
    console.error("❌ Bookmark Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};


export const getMyProfile = async (req, res)=>{
    try{
        const id = req.params.id;
        const user = await User.findById(id).select("-password");
        return res.status(200).json({
            message: user,
        })
    }
    catch(error)
    {
        console.log(error);
    }
}

export const getOtherUsers = async (req, res) => {
  try {
    const  id  = req.body;

    const otherUsers = await User.find({ _id: { $ne: id } }).select("-password");

    if (!otherUsers || otherUsers.length === 0) {
      return res.status(404).json({
        message: "No users found.",
      });
    }

    return res.status(200).json({
      otherUsers,
    });
  } catch (error) {
    console.error("Error fetching other users:", error);
    res.status(500).json({ message: "Server error." });
  }
};


export const Follow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;  // karan
    const userId = req.params.id;        // shubham

    const loggedInUser = await User.findById(loggedInUserId);
    const user = await User.findById(userId);

    if (!user.followers.includes(loggedInUserId)) {
      await user.updateOne({ $push: { followers: loggedInUserId } });
      await loggedInUser.updateOne({ $push: { following: userId } });

      return res.status(200).json({
        message: `${loggedInUser.name} just followed ${user.name}`,
        success: true
      });
    } else {
      return res.status(400).json({
        message: `User already follows ${user.name}`,
        success: false
      });
    }
  } catch (error) {
    console.error("Error in Follow controller:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};


export const Unfollow = async (req, res)=>{
    try{
        const loggedInUserId = req.body.id;
        const userId = req.params.id;

        const loggedInUser = await  User.findById(loggedInUserId);
        const user = await User.findById(userId);

        if(user.followers.includes(loggedInUserId))
        {
            await user.updateOne({ $pull: { followers: loggedInUserId } });
            await loggedInUser.updateOne({ $pull: { following: userId } });

            return res.status(200).json({
                message: `${loggedInUser.name} just unfollowed ${user.name}`,
                success: true
      });
        }
        else
        {
            return res.send(400).json({
                message: `user does not follow ${user.name}`,
                success: true,
            })
        }
    }
    catch(error)
    {
        console.log(error);
    }
}



