import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}bitlinks`, {
            useNewUrlParser: true,
        });
     

    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }

}
export default connectDB;