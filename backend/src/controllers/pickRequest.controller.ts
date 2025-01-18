import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { Request , Response } from "express";
import { PickRequest } from "../models/pickRequest";

// creating a pick up request
export   const  makePickUprequest = asyncHandler(async (req:Request , res:Response) => {
    const {
        name,
        email,
        phone,
        address,
        pickUpDate,
        pickUpTime,
        category,
    } = req.body;
    
    if(
        [name , email , phone ,  pickUpTime , pickUpDate ].some((field: string) => field.trim() === '') ||
        !address.street.trim() || !address.city.trim() || !address.state.trim() ||
        !address.postal.trim() || !address.country.trim()
    ){
        throw new ApiError(400 , "All fields are required");
    }

    if(Array.isArray(category) && category.length === 0){
        throw new ApiError(400 , "category is required");
    }

    if(!pickUpDate  ){
        throw new ApiError(400 , "pickupdate should be selected");
    }

    //Ensuring  pickUpDate is a valid Date object
    // const pickUpDateObj = new Date(pickUpDate); 
    // if (isNaN(pickUpDateObj.getTime())) {
    //     throw new ApiError(400, "Invalid pick-up date.");
    // }

    const pickRequest = await PickRequest.create(
        {
            name,
            email,
            phone,
            address,
            pickUpDate ,
            pickUpTime,
            category,
            img : "https://plus.unsplash.com/premium_photo-1674927125667-9ef5dcf7d125?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b2xkJTIwZHVzdGJpbnxlbnwwfHwwfHx8MA%3D%3D",
            status : "Pending",
            sellOrDonate : "Sell"

        }
    )

    if(!pickRequest){
        throw new ApiError(500 , "something went wrong while creating pick up request");
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201 , pickRequest , "pick up request created successfully")
    )
        
})