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
