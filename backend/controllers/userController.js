import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


export const register = async (req,res)=>{
    const {name , username , password , gender , confirmPassword} = req.body;
    if(!name || !username || !password || !gender || !confirmPassword){
        return res.status(400).json({error:"All fields are required"})
    }
    if(password !== confirmPassword){
        return res.status(400).json({error:"Password not match"})
    }

    const user = await User.findOne({username})
    if(user){
        return res.status(400).json({error:"Username already exist's"})
    }
    
    const hashPassword = await bcrypt.hash(password,10)
    const malePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femalePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    await User.create({
        name, 
        username, 
        password:hashPassword, 
        gender, 
        profilePhoto:gender == 'male' ? malePhoto : femalePhoto
    });
    return res.json({message:"Thanks For Registration"})
}

export const login = async (req,res)=>{
    try{
        const {username , password} = req.body;
        if(!username || !password){
            return res.status(400).json({error:"All fields are required"})
        }
        const user = await User.findOne({username})
        if(!user){
            return res.json({error:"Incorrect Username or Password"})
        }
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.json({error:"Incorrect Username or Password"})
        }

        //If password is true Assign Token
        const token = await jwt.sign({userid:user._id},process.env.SECRET_KEY , {expiresIn:'1D'})
        return res.status(200).cookie("token",token,{httpOnly:true,sameSite:'lax',secure:false}).json({
            data:{_id:user._id,
            username:user.username,
            name:user.name,
            profilePhoto:user.profilePhoto},
            message:"Thanks For Login"
        })
    }catch(err){
        console.log(err);
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false, // ⛔ Change to true in production
            sameSite: "Lax"
        });

        return res.json({ message: "Logout Successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export const getotherUsers = async (req,res)=>{
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        return res.json(otherUsers)
    } catch (error) {
        console.log(error)
    }
}