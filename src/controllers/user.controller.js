import asyncHandler from "../utils/asyncHandler.js";
import {APIError} from "../utils/APIError.js"
import {User} from "../models/user.model.js"
import { uploadCloudinary} from "../utils/cloudinary.js";
import {APIResponse} from "../utils/APIResponse.js"

const registerUser=asyncHandler(async(req,res)=>{
    // get user details from frontend
    // validation - not empty
    // check if user already exists : username,email
    // check for images ,check for avatar
    // upload them to cloudinary, chek avatar
    // create user object -- create entry in db
    // remove password and rerfresh token field from response
    // check for user creation
    // return response

    const {username,email,fullname,password}=req.body
    // console.log("email: ",email)

    // if(fullname==="" ){ 
    //     throw new APIError(400,"Fullname is required")
    // }

    if([fullname,email,username,password].some((field)=>
    field?.trim()==="")){
        throw new APIError(400,"All fields are required")
    }

    const existingUser=await User.findOne({
        $or:[{username},{email}]
    })

    if(existingUser){
        throw new APIError(409,"User already exists")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path;
    // const coverImageLocalPath=req.files?.coverImage[0]?.path;


    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath=req.files.coverImage[0].path;
    }

    if(!avatarLocalPath){
        throw new APIError(400,"Avatar is required")
    }

    const avatar=await uploadCloudinary(avatarLocalPath)
    const coverImage=await uploadCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new APIError(500,"Avatar file is required")
    }

    // console.log(req.files)

    const user=await User.create({
        username:username.toLowerCase(),
        email,
        fullname,
        password,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
    })

    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new APIError(500,"User creation failed")
    }

    return res.status(201).json(
        new APIResponse(200,createdUser,"User Registered Successfully")
    )
})

export {registerUser}