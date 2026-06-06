import mongoose from 'mongoose';

export async function connectDatabase(uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/secure_banking') {
  if (!uri) {
    throw new Error('MONGODB_URI is required');
  }

  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
}
