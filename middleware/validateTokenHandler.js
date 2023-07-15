import jwt, { decode } from "jsonwebtoken";
import asyncHandler from "express-async-handler";


export const validateToken = asyncHandler(async(req,res,next)=>{
         let token;
         let authHeader=req.headers.authorization||req.headers.Authorization;
         if(authHeader&&authHeader.startsWith("Bearer")){
            token=authHeader.split(" ")[1];
            jwt.verify(token,process.env.ACCESS_TOKEN_SECERT,(err,decoded)=>{
                if(err){
                    res.status(400);
                    throw new Error("user is not autherized");
                }
                req.user=decoded.user;
                next();
            });
            if(!token){
                res.status(401);
                    throw new Error("user is not autherized or token missing");

            }
         }

})