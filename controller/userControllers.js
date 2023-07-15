import asyncHandler from "express-async-handler";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        res.status(400);
        throw new Error("all fields are mendatory");
    }
    const userAvaliable = await User.findOne({ email });

    if (userAvaliable) {
        res.status(400);
        throw new Error("user already register");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        userName,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error("invalid user data ");
    }

    req.json({ message: "user register successfully" });

});





export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("all fields are mendatory");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
                user: {
                    userName: user.userName,
                    email: user.email,
                    id: user.id
                },

            },process.env.ACCESS_TOKEN_SECERT
            ,
            {expiresIn:"2 days"}
        );
        res.status(200).json({accessToken});

    }else{
        req.status(401);
        throw new Error("email or pasword invalid")
    }

});


export const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});