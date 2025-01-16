import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import User ,{IUser} from "../models/user.model";
import { Request, Response } from "express";

export interface AuthenticatedRequest extends Request {
    user?: IUser;
}

// helper function to generate the access and refereh token

const generateAccessAndRefreshToken = async (userId : string) :Promise<{ accessToken: string; refreshToken: string }> =>{
    try {
        const user = await User.findById(userId);

        if(!user) {
            throw new ApiError(404 , "user not found");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave : false });

        return {accessToken , refreshToken};
        
    } catch (error : any) {
        throw new ApiError(500, "something went wrong while generating tokens ");
    }
    
}

// Registration endpoint to register a user

export const registerUser = asyncHandler(async (req:Request , res:Response)=>{

    const {username , email , password} = req.body;

    if ([username, email, password].some((field: string) => field.trim() === '')) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if(existingUser){
        throw new ApiError(409 , "user already exists");
    }
    
    const newUser = await User.create({
        username:username.toLowerCase(),
        email,
        password,
    })
    await newUser.save();
    // mail service here

    const createdUser = await User.findById(newUser._id).select("-password -refreshToken");
    if(!createdUser){
        throw new ApiError(504 , "something went wrong while registering the user ");
    }

    return res.status(201).json(new ApiResponse(201 , createdUser , "user registered successfully"));
})

// ednpoint to login user
export const loginUser = asyncHandler(async (req:Request , res:Response) => {

    const {email , password,username} = req.body;
    if(!email  && !password ){
        throw new ApiError(400 , "username or password is required");
    }

    const loggedInUser = await User.findOne({
        $or:[{ email } , { username }]
    })

    if(!loggedInUser){
        throw new ApiError(404 , "user does not exist");
    }

    const isValidPassword = await loggedInUser.isPasswordCorrect(password);
    if(!isValidPassword){
        throw new ApiError(401 , "Invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(loggedInUser._id).catch((error) => {
        throw new ApiError(500, "something went wrong while generating tokens ");
    });

    const user = await User.findById(loggedInUser._id).select("-password -refreshToken")

    // sending cookies 
    const options ={
        httpOnly : true,
        secure : true,
    }
    return res
            .status(200)
            .cookie("accessToken" , accessToken , options)
            .cookie("refreshToken" , refreshToken , options)
            .json(new ApiResponse
                (200 , 
                    {
                        user: user,accessToken,refreshToken
                    } , 
                    "user logged in successfully"));
})

// // endpoint to logout user 
export const logoutUser = asyncHandler(async (req:AuthenticatedRequest , res:Response) => {

    if(!req.user)    {
        throw new ApiError(
            401,
            "user is not authenticated"
        )
    }

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {new : true}
    )

    const options = {
        httpOnly : true,
        secure : true,
    }

    return res
    .status(200)
    .clearCookie("accessToken" , options)
    .clearCookie("refreshToken" , options)
    .json(
        new ApiResponse(200,{} , "user logged out successfully")
    )

})