import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { Request, Response } from "express";
import { PickRequest } from "../models/pickRequest";
import { IUser } from "../models/user.model";
import { FileI } from "../middleware/multer.middleware";
import { uploadOnCloudinary } from "../utils/cloudinary";
import Collector,{ICollector} from "../models/collector.model";


export interface AuthenticatedRequest extends Request {
  user?: IUser ;
}


export interface AuthenticatedRequestCollector extends Request {
  user?: ICollector;
}


// Creating a pick-up request
export const makePickUprequest = asyncHandler(async (req: AuthenticatedRequest & FileI, res: Response) => {
  const {
    name,
    email,
    phone,
    pickUpDate,
    pickUpTime,
    category,
    street,
    city,
    state,
    postal,
    country,
  } = req.body;

 

  // Check for empty or missing fields
  if (
    [name, email, phone, pickUpTime, pickUpDate,street,city,state,postal,country].some((field: string) => field.trim() === '')
    
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Ensure category is an array and not empty
  if (Array.isArray(category) && category.length === 0) {
    throw new ApiError(400, "Category is required");
  }

  // Validate pick-up date
  if (!pickUpDate) {
    throw new ApiError(400, "Pick-up date should be selected");
  }



  // Ensure image file is uploaded
  const img = req.file?.path;
  if (!img) {
    throw new ApiError(400, "Image is required");
  }

  // Upload image to Cloudinary
  const imgUrl = await uploadOnCloudinary(img);
  if (!imgUrl) {
    throw new ApiError(500, "Something went wrong while uploading image");
  }

  // Create the pick-up request in the database
  const pickRequest = await PickRequest.create({
    name,
    email,
    phone,
    address: {
      street:street,
      city:city,
      state:state,
      postal:postal,
      country:country,
    },
    pickUpDate,
    pickUpTime,
    category,
    img: imgUrl.url,
    status: "Pending",
    sellOrDonate: "Sell",
  });

  if (!pickRequest) {
    throw new ApiError(500, "Something went wrong while creating pick-up request");
  }
  console.log(pickRequest)

  return res.status(201).json(new ApiResponse(201, pickRequest, "Pick-up request created successfully"));
});

export const getPickUpRequest = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const request = await PickRequest.find({
    email: req.user?.email,
    status: "Pending",
  });

  if (!request) {
    throw new ApiError(404, "Pick-up request not found");
  }

  res.status(200).json(new ApiResponse(200, request, "Pick-up request found successfully"));
});


// endpoint to accept pick-up request 

export const acceptPickUpRequest = asyncHandler(async (req: AuthenticatedRequestCollector, res: Response) => {

  const { requestId } = req.params;

  if(!requestId){
    throw new ApiError(400 , "Request id is required");
  }
   
  console.log(req.user)
  if(!req.user){
    throw new ApiError(401 , "Unauthorized access");

  }

  const { collectorEmail , collectorPhn , collectorName } = req.user;

  const request = await PickRequest.findByIdAndUpdate(
      {
        _id : requestId,
        status : "Pending"
     },
     {
        $set :{
          status : "Approved",
          acceptedBy : collectorName,
          collectorEmail : collectorEmail,
          collectorPhn : collectorPhn
        }
     },
     {
      new : true
     }
    )
    await request?.save();

    if(!request){
      throw new ApiError(404 , "Request is already accepted or  not found");
    }

    return res.
    status(200)
    .json(
      new ApiResponse(200 , request , "Request accepted successfully")
    )
  
})

// endpoint to complete a approved request 

export const completePickUpRequest = asyncHandler(async (req: AuthenticatedRequestCollector, res: Response) => {

  const { requestId } = req.params;

  if(!requestId){
    throw new ApiError(400 , "Request id is required");
  }

  const acceptedRequest = await PickRequest.findOneAndUpdate(
    {
      _id : requestId,
    },
    {
      $set : {
        status : "Completed"
      }
    },{
      new : true
    }
  )

  if(!acceptedRequest){
    throw new ApiError(404 , "Request not found");
  }

  return res
  .status(200)
  .json(
    new ApiResponse(200 , acceptedRequest , "Request completed successfully")
  )

})

// endpoint to cancel accepted pick-up request

export const cancelPickUpRequest = asyncHandler(async (req: AuthenticatedRequestCollector, res: Response) => {

  const { requestId } = req.params;

  if(!requestId){
    throw new ApiError(400 , "Request id is required");
  }

  const acceptedRequest = await PickRequest.findOneAndUpdate(
    {
      _id : requestId,
    },
    {
      $set : {
        status : "Cancelled"
      }
    },
    {new : true}
  )

  if(!acceptedRequest){
    throw new ApiError(404 , "Request not found");
  }

  return res
  .status(200)
  .json(
    new ApiResponse(200 , acceptedRequest , "Request cancelled successfully")
  )
  
})