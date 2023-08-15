import mongoose from "mongoose";

let isConnected = false;

export default async function dbConnection() {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) {
    console.log("No connection to Database");
    throw new Error("No connection to Database");
  }
  if (isConnected) return console.log('already connected to Database');
  
    try {
      await mongoose.connect(process.env.MONGODB_URL);
      isConnected = true;
      console.log("DB CONNECTED");
    } catch (error) {
      console.log("DB CONNECTION ERROR");
    }
}
