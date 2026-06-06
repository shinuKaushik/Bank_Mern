import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo;

beforeAll(async () => {
  process.env.JWT_SECRET = 'test-secret';
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  await Promise.all(collections.map((collection) => collection.deleteMany({})));
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});
