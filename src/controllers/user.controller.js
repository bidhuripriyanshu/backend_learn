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

  const { fullname, email, username, password } = req.body;
  console.log("email: ", email);
  console.log("password:", password);

  // if(fullname ===""){
  //   throw new ApiError(400,"Fullname is required");
  // }


  if ([fullname, email, username, password].some((field) =>

    field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

 const existedUser = user.findOne({
    $or: [{username},{email}]
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
  const coverimage = await uploadOnCloudinary(coverImageLocalPath);
  if(!avatar){
    throw new ApiError(500,"Avatar upload failed");
  }

  const newUser = await user.create({
    fullname,
    email,
    username:username.toLowerCase(),
    password,
    avatar:avatar.url,
    coverimage:coverimage?.url || "",
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