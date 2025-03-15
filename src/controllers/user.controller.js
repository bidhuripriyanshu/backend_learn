import {asynHandler} from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
const registerUser = asynHandler(async(req,res)=>{
  //1.get user details from frontend
  //2. validation - not empty
  //3. check if user exists  :username,email
  //4.upload them to cloudinary,avatar
  //5.create user object- create entry in db
  //6.remove paaword and refresh token field from response
  //7.check fro user creation
  //8.return response  
  const{fullname,email,username,password}=req.body;
  console.log("email: ",email);
  console.log("password:",password);

})

export {registerUser}; 