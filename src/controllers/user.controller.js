import { asynHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import {user} from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';



const registerUser = asynHandler(async (req, res) => {

  //1.get user details from frontend
  //2. validation - not empty
  //3. check if user exists  :username,email
  //3.1 check for images,check for avatar
  //4.upload them to cloudinary,avatar
  //5.create user object- create entry in db
  //6.remove paaword and refresh token field from response
  //7.check fro user creation
  //8.return response 

  const { fullName, email, userName, password } = req.body;
  console.log("email: ", email);
  console.log("password:", password);
  console.log("userName:", userName);
  console.log("fullName:", fullName);
  // console.log(" req.body: ", req.body);     


  // if(fullname ===""){
  //   throw new ApiError(400,"Fullname is required");
  // }


  if ([fullName, email, userName, password].some((field) =>

    field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

 const existedUser = await user.findOne({
    $or: [{userName},{email}]
  })

  if(existedUser){
    throw new ApiError(400,"User already exists");
  }



 const avatarLocalPath = req.files?.avatar[0]?.path;
 const coverImageLocalPath =req.files?.coverimage[0]?.path;

 if(!avatarLocalPath){
   throw new ApiError(400,"Avatar is required");
 }



 //upload on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
 
  if(!avatar){
    throw new ApiError(500,"Avatar file is required ");
  }

  const newUser = await user.create({
    fullName,
    email,
    userName:userName.toLowerCase(),
    password,
    avatar:avatar.url,
    coverImage:coverImage?.url || "", 
  })

  const createdUser = await newUser.findById(user._id).select("-password -refreshToken");

 if(!createdUser){
    throw new ApiError(500,"User creation failed");
 }

 //response sending after created user successfully

 return res.status(201).json(
   new ApiResponse(200,createdUser,"User regitered successfully")
 )

})


export { registerUser }; 