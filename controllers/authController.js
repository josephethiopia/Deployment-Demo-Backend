import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const signup = async (req, res) => {
    const {username, email, password, role} = req.body;

    try {
        const hashed = await bcrypt.hash(password, 10);
        const newUser = new User({
            username, email, password: hashed, role
        });
        await newUser.save();
        res.status(201).json({message: "User Created Successfully"}); 
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username});
        if(!user) return res.status(404).json({error: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(403).json({error: 'Wrong Password'});

        const token = jwt.sign({id: user._id, role: user.role}, 'secret-key');

        res.json({token: token,id:user._id})

    } catch (error) {
        res.status(500).json({error: error.message});
    }  
}

