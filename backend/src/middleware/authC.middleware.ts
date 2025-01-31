import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";
import Collector , { ICollector } from "../models/collector.model";
import asyncHandler from "../utils/asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";

// type definiton for the request object to include user
export interface AuthenticatedRequest extends Request {
    user?:ICollector;
}

export const verifyCollectorJwt = asyncHandler(async (req:AuthenticatedRequest , res:Response , next:NextFunction) => {
    try{
        const token = req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];

        if(!token){
            throw new ApiError(401 , " Unauthorized access ");
        }

        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;

        const user = await Collector.findById(decodedToken._id).select("-password -refreshToken");

        if(!user){
            throw new ApiError(401 , " Invalid token ");
        }

        req.user = user;

        next();

    } catch (error : any) {
        throw new ApiError(401 , error?.message || "Invalid token ");

    }
})