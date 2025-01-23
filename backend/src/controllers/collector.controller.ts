import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import Collector , {ICollector} from "../models/collector.model";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

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

    serviceAreas.forEach((area : {pinCode : string , city : string}) => {
        if(!area.pinCode || area.pinCode.trim() === ''){
            throw new ApiError(400 , "Pincode is required");
        }

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
