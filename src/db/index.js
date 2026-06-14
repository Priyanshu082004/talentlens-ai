import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect (`${process.env.MONGO_URl}`)
          console.log(`\n MongoDB connected !!!!!! DB HOST:${connectionInstance.connection.host}`);
        console.log((`${process.env.MONGODB_URL}`));}
        catch (error) {
            console.log("MongoDB CONNECTION FAILED!!!!",error);
            process.exit(1);
        }
    }



export default connectDB;