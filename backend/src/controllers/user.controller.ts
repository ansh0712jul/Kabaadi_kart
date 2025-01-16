import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import User from "../models/user.model";
import { Request, Response } from "express";



// helper function to generate the access and refereh token

const generateAccessToken = async (userId : string) =>{
    try {
        const user = await User.findById(userId);

        if(!user) {
            throw new ApiError(404 , "user not found");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save();

        return {accessToken , refreshToken};
        
    } catch (error : any) {
        return new ApiError(500, error.message);
    }
    
}

// Registration endpoint to register a user

const registerUser = asyncHandler(async (req:Request , res:Response)=>{

    const {username , email , password} = req.body;

    if ([username, email, password].some((field: string) => field.trim() === '')) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({email});
    if(existingUser?.isVerified){
        return new ApiError(400 , "user already exists");
    }

    const verificationToken = Math.floor(1000000+Math.random()*9000000 + 1).toString();
    const verificationTokenExpires = new Date(Date.now() + 60000)

    if(existingUser){
        if(existingUser.isVerified){
            return new ApiError(400 , "user already exists with same email or username ");
        }
        else {
            existingUser.verificationToken = verificationToken;
            existingUser.verificationTokenExpires = verificationTokenExpires;
            await existingUser.save();
            // mail service here 

        }
    }
    else{
        const newUser = await User.create({
            username,
            email,
            password,
            verificationToken,
            verificationTokenExpires
        })
        await newUser.save();
        // mail service here
    }

    return res.status(201).json(new ApiResponse(201 , "user registered successfully"));
})

// verify a user

const verifyUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, token } = req.body;

    if (!username || !token) {
        throw new ApiError(301, "Invalid Data for verification of user");
    }

    const user = await User.findOne({
        username: username
    });

    if (!user) {
        throw new ApiError(401, "User not found");
    }

    if (user.isVerified) {
        throw new ApiError(302, "User is already verified");
    }

    const isCodeValid = user.verificationToken === token;
    //new Date(0) will return 1970-01-01T00:00:00.000Z, which means the code is expired
    const isCodeNotExpired =
        new Date(user.verificationTokenExpires || 0) > new Date();

    if (isCodeValid && isCodeNotExpired) {
        user.isVerified = true;
        user.verificationToken = "";
        user.verificationTokenExpires = undefined;
        await user.save();
        return res.status(200).json(new ApiResponse(200, "User verified successfully"));
    } else if (!isCodeNotExpired) {
        throw new ApiError(400, "Verification code expired");
    } else {
        throw new ApiError(400, "Invalid verification code");
    }
})