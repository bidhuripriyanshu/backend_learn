import { asynHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asynHandler(async (req, res, next) => {
    try {
        req.cookies.accessToken || req.header("Authorizatiom")
            ("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Not authorized to access this route")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshtoken")
        if (!user) {
            throw new ApiError(401, "Not authorized to access this route")
        }


        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401, "Not authorized to access this route")
    }

})

