import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { email, password, username } = req.body;
    try {

        const userFound = await User.findOne({email});

        if(userFound) return res.status(400).json(["The email already exists"]);
        
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            username, email,
            password: passwordHash
        });

        const userSaved = await newUser.save();

        const token = await createAccessToken({ id: userSaved._id });
        res.cookie("token", token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: username.createdAt,
            updatedAt: userSaved.updatedAt
        });

    } catch (error) {
        console.error(error);
        res.json(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.status(400).json(["The email doesn't exists"]);
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json(["The password is incorrect"]);
        }

        const token = await createAccessToken({ id: userFound._id, username: userFound.username });

        res.cookie("token", token, { httpOnly: process.env.NODE_ENV !== "development", secure: true, sameSite: "none" });

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json([error.message]);

    }
}

export const logout = async (req, res) =>{
    res.cookie("token", "",{
        httpOnly: true,
        secure: true,
        expires: new Date(0)
    });
    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);
    if(!userFound) return res.status(404).json({message: `User ${req.user.id} not found`});

    return res.json({id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });
    
}

export const verify = async(req, res) => {
    const {token} = req.cookies;

    if(!token) return res.status(401).json({message: "Unauthorized"});
    
    jwt.verify(token, TOKEN_SECRET, async (err, user)=> {
       if(err) return res.status(401).json({message: "Unauthorized"});

       const userFound = await User.findById(user.id);
       if(!userFound) return res.status(401).json({message: "Unauthorized"});

       return res.json({
           id: userFound._id,
           username: userFound.username,
           email: userFound.email
       });
    });

}
