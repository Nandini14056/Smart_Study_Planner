import mongoose from 'mongoose';

async function  connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MONGODB connected succesfully!")
  } catch (error) {
    console.log(error.message)
  }
}

export default connectDB