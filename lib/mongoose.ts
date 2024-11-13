import mongoose from "mongoose";

export async function initMongoose() {

  console.log(process.env.MONGODB_URL )
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }
  return await mongoose.connect(process.env.MONGODB_URL || '')
}