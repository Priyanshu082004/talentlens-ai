// Load environment variables FIRST before any imports
// import dotenv from "dotenv";
// dotenv.config({
//     path: './.env'
// })


// const result = dotenv.config({
//     path: "./.env",
// });

// console.log(result);
// console.log(process.env.GEMINI_API_KEY);

import connectDB from "./db/index.js";
import  app  from "./app.js";



console.log("app.js loaded");
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000 , ()=>{
        console.log(`Server is running on port : ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
  console.log("MONGO DB CONNECTION FAILED!!!!",err);
  
})

