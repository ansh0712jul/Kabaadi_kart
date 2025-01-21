import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { Request, Response } from "express";
import { PickRequest } from "../models/pickRequest";
import { IUser } from "../models/user.model";
import { FileI } from "../middleware/multer.middleware";
import { uploadOnCloudinary } from "../utils/cloudinary";

export interface AuthenticatedRequest extends Request {
  user?: IUser;
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
