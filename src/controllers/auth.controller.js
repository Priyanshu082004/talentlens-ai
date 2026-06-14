import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



// const generateAccessAndRefreshTokens = async (user) => {
//     try{}
// }

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

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });


   
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

