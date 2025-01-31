import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import Collector , {ICollector} from "../models/collector.model";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PickRequest } from "../models/pickRequest";

export interface AuthenticatedRequest extends Request {
    user?: ICollector
}

// helper function to generate the access and refereh token

const generateAccessAndRefreshToken = async(userId:string): Promise<{accessToken: string; refreshToken: string}> =>{
    try{
        const user = await Collector.findById(userId);

        if(!user){
            throw new ApiError(404 , "user not found");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave : false});

        return {accessToken , refreshToken};
    } catch (error : any){
        throw new ApiError(500, "something went wrong while generating tokens ");
    }
}

// Registration endpoint

export const registerCollector = asyncHandler(async(req:Request , res:Response)=>{

    const {collectorName , collectorEmail,collectorPhn , password , location , serviceAreas} = req.body;

    // validating required fields 
    if(
        [collectorName , collectorEmail , collectorPhn , password , location].some((field : string) => field.trim() === '')
    ){
        throw new ApiError(400 , "All fields are required");
    }
    
    // validating service areas
    if(!Array.isArray(serviceAreas) || serviceAreas.length === 0){
        throw new ApiError(400 , "Service areas are required");
    }

    serviceAreas.forEach((area : { city : string}) => {
    
        if(!area.city || area.city.trim() === ''){
            throw new ApiError(400 , "Location is required");
        }

    })

    const existedUser = await Collector.findOne({
        $or : [{collectorEmail} , {collectorPhn}]
    })

    if(existedUser){
        throw new ApiError(409 , "Collector already exists");
    }

    const newCollector = await Collector.create({
        collectorName : collectorName.toLowerCase(),
        collectorEmail,
        collectorPhn,
        password,
        location,
        serviceAreas
    })
    await newCollector.save();

    const createdCollector = await Collector.findById(newCollector._id).select("-password -refreshToken");

    if(!createdCollector){
        throw new ApiError(504 , "something went wrong while registering the collector");
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201 , createdCollector , "Collector registered successfully")
    )
})

// login endpoint 

export const loginCollector = asyncHandler(async(req:Request , res:Response) => {
    
    const {collectorEmail , password} = req.body;

    if(!collectorEmail && !password){
        throw new ApiError(400 , "username or password is required");
    }

    const loggedInCollector = await Collector.findOne({
        collectorEmail
    })

    if(!loggedInCollector){
        throw new ApiError(404 , "Collector does not exist");
    }

    const isValidPassword = await loggedInCollector.isPasswordCorrect(password);

    if(!isValidPassword){
        throw new ApiError(401 , "Invalid collector credentials");
    }

    const { accessToken , refreshToken} = await generateAccessAndRefreshToken(loggedInCollector._id)
    .catch((error) => {
        throw new ApiError(500, "something went wrong while generating tokens ");   
    })

    const collector = await Collector.findById(loggedInCollector._id).select("-password -refreshToken");

    // sending cookies

    const options = {
        httpOnly : true,
        secure : true,
    }

    return res
    .status(200)
    .cookie("accessToken" , accessToken , options)
    .cookie("refreshToken" , refreshToken , options)
    .json(
        new ApiResponse(200 , 
            {
                collector,
                accessToken,
                refreshToken
            },
            "Collector logged in successfully"
        )
    )
})

// logout endpoint 

export const logoutCollector = asyncHandler(async(req:AuthenticatedRequest , res:Response) => {

    if(!req.user){
        throw new ApiError(401 , "user is not authenticated");
    }

    await Collector.findByIdAndUpdate(
        req.user._id,
        {
            $set : {
                refreshToken : undefined
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

// endpoint to refresh access token 

export const refreshAccessToken = asyncHandler( async(req:AuthenticatedRequest , res:Response) =>{

    const IncomingRefreshToken = req.cookies?.refreshToken || req.headers["authorization"]?.split(" ")[1] || req.body.refreshToken;

    if(!IncomingRefreshToken){
        throw new ApiError(401 , "Unauthorized access");

    }

    try {
        const decodedToken = jwt.verify(IncomingRefreshToken , process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;

        const user = await Collector.findById(decodedToken._id);

        if(!user){
            throw new ApiError(401," Invalid Refresh token  ");
        }

        if(user.refreshToken !== IncomingRefreshToken){
            throw new ApiError(401 , " Refresh token has expirred or in used")
        }

        const { accessToken , refreshToken } = await generateAccessAndRefreshToken(user._id);

        const options = {
            httpOnly : true,
            secure : true
        }

        return res
        .status(200)
        .cookie("accessToken" , accessToken , options)
        .cookie("refreshToken" , refreshToken, options)
        .json(
            new ApiResponse(200,{
                accessToken,
                refreshToken
            },
            "Access token refreshed successfully")
        )
    } catch (error : any) {
        throw new ApiError(500, error?.message ||  "somehting went wrong while refreshing access token");
    }
})

// endpoint to get a collector by emial

export const getCollectorByEmail = asyncHandler(async(req:Request , res:Response) => {

    const { collectorEmail } = req.query;

    if(!collectorEmail){
        throw new ApiError(400 , "Collector email is required");
    }

    const collector = await Collector.findOne({
        collectorEmail
    }).select("-password -refreshToken")

    if(!collector){
        throw new ApiError(404 , "Collector not found");
    }
    
    return res
    .status(200)
    .json(
        new ApiResponse(200 , collector , "Collector found successfully")
    )
})

export const acceptedPickUpRequest = asyncHandler(async(req:AuthenticatedRequest , res:Response) => {
    
    const collector = await PickRequest.find({collectorEmail: req.user?.collectorEmail});

    if(!collector){
        throw new ApiError(404 , "Collector not found");
    }

    res.status(200).json(new ApiResponse(200 , collector , "Request found successfully"));

})




