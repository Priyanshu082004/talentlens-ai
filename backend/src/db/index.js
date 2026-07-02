import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect (`${process.env.MONGODB_URL}`)
          console.log(`\n MongoDB connected !!!!!! DB HOST:${connectionInstance.connection.host}`);
        console.log((`${process.env.MONGODB_URL}`));}
        catch (error) {
            console.log("MongoDB CONNECTION FAILED!!!!",error);
            process.exit(1);
        }
    }



export default connectDB;

// database connection file for connecting to MongoDB using mongoose. 
// It uses the MONGODB_URL from environment variables to establish the connection. If the connection is successful, it logs the host of the connected database. 
// If it fails, it logs the error and exits the process with a failure code.