import mongoose from 'mongoose';

export default async function connect() {
    try {
      await mongoose.connect(process.env.MONGODB_URL || '');
      console.log('DB CONNECTED');
  } catch (error) {
    console.log('DB CONNECTION ERROR');
  }
}
