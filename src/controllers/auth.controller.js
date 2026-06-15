import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const generateAccessAndRefreshTokens =  async (userId) => {
  try{
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  }
  catch(error){
    console.error("Error generating tokens:", error);
    throw new Error("Token generation failed");
  }  
}   
//  make utils for apiresponse and use that in all the controllers to send response in a consistent format with status code, message and data (if any)

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body; 

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please provide all the required fields" });
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400)
      .json({ message: "User with this username or email already exists" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
   

  //  const token =  jwt.sign({ id: newUser._id , username: newUser.username}, 
  //   process.env.JWT_SECRET, {
  //       expiresIn: process.env.JWT_EXPIRES_IN,
  //     });    instead of this use a helepr method  to generate tokens and send both access and refresh tokens in response
 
   
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

