import { asynHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const generateAccessAndRefreshToken= async (userId) =>{
  try{
     const User = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refereshToken = user.generateRefreshToken();
     user.refereshToken = refereshToken;
     await user.save({validateBeforeSave: false});
     
     return {accessToken,refereshToken};



    } catch(error){
      throw new ApiError(500,"somethings went wrong while generating referesh and access token");
  }
     
}


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
 const coverImageLocalPath =req.files?.coverImage[0]?.path;

 if(!avatarLocalPath){
   throw new ApiError(400,"Avatar is required");
 }



 //upload on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
 
  if(!avatar){
    throw new ApiError(500,"Avatar file is required ");
  }

  const newUser = await User.create({
    fullName,
    email,
    userName:userName.toLowerCase(),
    password,
    avatar:avatar.url,
    coverImage:coverImage?.url || "", 
  })

  const createdUser = await newUser.findById(User._id).select("-password -refreshToken");

 if(!createdUser){
    throw new ApiError(500,"User creation failed");
 }

 //response sending after created user successfully

 return res.status(201).json(
   new ApiResponse(200,createdUser,"User regitered successfully")
 )

})

const loginUser = asynHandler(async (req, res)=>{
   //req.body--->data
   //username or email
   //find the user
   //check for password
   //access and referesh token 
   // send cookie
   
   const {email,username,password}=req.body;

   if(!username && !email){
      throw new ApiError(400,"username or password is required");
}

const user = await User.findOne({
   $or:[{email},{username}]
})
if(!user){
     throw new ApiError(404,"User not found");
  }

 const isPasswordValid = await user.isPasswordCorrect(password)
 if(!isPasswordValid){
    throw new ApiError(400,"Password is incorrect");
 }
 const {accessToken,refereshToken} = await generateAccessAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).
  select( "-password -refreshToken")
  
  //Cookie
   const options ={
       httpOnly:true,
       secure:true,
   }
   return res.status(200).cookie("accessToken",accessToken,options).cookie(
       "refreshToken",refereshToken,options).json(
          new ApiResponse(
            {
              user:loggedInUser,accessToken,
              refreshToken
            },
            "User logged in Successfully"
          )
       )

})

const logoutUser = asynHandler(async (req, res)=>{
     
})



export { registerUser }; 