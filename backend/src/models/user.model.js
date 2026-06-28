import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required:[true, "Username is required"],} ,
  
    email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  }

});
userSchema.methods.generateAccessToken= function(){
    return jwt.sign({
        _id: this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName
    },
      process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}
userSchema.methods.generateRefreshToken= function(){
    return jwt.sign({
        _id: this._id,
    
    },
      process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}





const User = mongoose.model("User", userSchema);

export { User };